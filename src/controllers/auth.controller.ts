import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from "../models/User";
import { generarJWT } from "../helpers/generate-jwt";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid user or password'
            });
        }

        if (!user.active) {
            return res.status(400).json({
                msg: "The user isn't active"
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Invalid user or password'
            });
        }

        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong. Talk with the administrator'
        });
    }
}
