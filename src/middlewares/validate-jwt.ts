import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User";


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({
            msg: 'There is no token in this petition'
        });
    }
    try {
        const response: any = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        const user = await User.findById(response.uid);

        if (!user) {
            return res.status(401).json({
                msg: `Invalid user - it doesn't exists in the database`
            });
        }
        if (!user.active) {
            return res.status(401).json({
                msg: `Invalid user - the user isn't active`
            });
        }
        req.currentUser = user;
        next();
    } catch (error) {
        return res.status(401).send({
            msg: 'Invalid token'
        });
    }

}