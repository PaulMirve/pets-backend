import { Request, Response } from "express";
import IPost from "../interfaces/Post";
import Post from "../models/Post";
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

export const postPost = async (req: Request, res: Response) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const data: IPost = req.body;
    data.user = req.currentUser;
    try {
        if (req.files) {
            const file: UploadedFile = req.files["file"] as UploadedFile;
            const { tempFilePath } = file;

            const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
            data.img = secure_url;

        }
        const post = new Post(data);
        await post.save();
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getPosts = async (req: Request, res: Response) => {
    const { limit = 10, offset = 0 } = req.query;
    const [count, posts] = await Promise.all([
        Post.countDocuments({ active: true }),
        Post.find({ active: true }).skip(Number(offset)).limit(Number(limit))
    ]);

    res.json({
        count,
        posts
    });
}

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.json(post);
}

export const putPost = async (req: Request, res: Response) => {
    const { _id, dateCreated, likes, user, img, ...data }: IPost = req.body
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    res.json(post);
}

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, { active: false }, { new: true });
    res.json(post);
}