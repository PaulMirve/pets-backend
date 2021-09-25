import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from '../models/User';
import IUser from '../interfaces/User';

export const postUser = async (req: Request, res: Response): Promise<void> => {

    const { name, lastName, password, email, role }: IUser = req.body;
    const user = new User({ name, lastName, password, email, role });
    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

    try {
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    const [count, users] = await Promise.all([
        User.countDocuments({ state: true }),
        await User.find({ state: true })
    ]);

    res.json({
        count,
        users
    });
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json(user);
}

export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: userId, google, email, ...rest }: IUser = req.body;
    if (rest.password) {
        rest.password = bcryptjs.hashSync(rest.password, bcryptjs.genSaltSync());
    }
    const user = await User.findByIdAndUpdate(id, rest, { new: true });
    res.json(user);
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false }, { new: true });
    res.json(user);
}