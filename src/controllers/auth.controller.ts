import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from "../models/User";
import { generarJWT } from "../helpers/generate-jwt";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no validos'
            });
        }

        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no validos'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no validosz'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal. Hable con el administrador'
        });
    }
}
