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