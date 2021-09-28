import { Request, Response } from "express";
import IPost from "../interfaces/Post";
import Post from "../models/Post";
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import User from "../models/User";
import sharp from 'sharp';

export const postPost = async (req: Request, res: Response) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const { description, width, height, left, top } = req.body;
    const post = new Post({ description, user: req.currentUser });
    try {
        if (req.files) {
            let outputImage = "croppedImage.jpg";
            const file: UploadedFile = req.files["file"] as UploadedFile;
            const { tempFilePath } = file;
            // await sharp(tempFilePath).extract({
            //     width: Math.trunc(Number(width)),
            //     height: Math.trunc(Number(height)),
            //     left: Math.trunc(Number(left)),
            //     top: Math.trunc(Number(top))
            // }).toFile(outputImage);
            await sharp(tempFilePath).resize({
                width: Math.trunc(Number(width)),
                height: Math.trunc(Number(height))
            }).toFile(outputImage);
            const { secure_url, public_id } = await cloudinary.uploader.upload(outputImage);
            post.public_id = public_id;
            post.img = secure_url;

        }

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
        Post.find({ active: true }).skip(Number(offset)).limit(Number(limit)).populate('user', "username -_id").sort({ dateCreated: 'desc' })
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

export const getPostByUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    const _user = await User.findOne({ username });
    let posts: IPost[] = [];
    if (_user) {
        posts = await Post.find({ user: _user._id });
    } else {
        res.status(400).json({ message: "Doesn't exists a user with that username" });
    }

    res.json(posts);
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