import { Request, Response } from "express";
import IPost from "../interfaces/Post";
import Post from "../models/Post";
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import User from "../models/User";
import sharp from 'sharp';
import mongoose from 'mongoose';
import { commentsQuery, userQuery, likesQuery, postQuery } from '../database/querys';
import Comment from "../models/Comment";

export const postPost = async (req: Request, res: Response) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const { description } = req.body;
    const post = new Post({ description, user: req.currentUser });
    try {
        if (req.files) {
            let outputImage = "\\tmp\\croppedImage.jpg";
            const file: UploadedFile = req.files["file"] as UploadedFile;
            const { tempFilePath } = file;
            await sharp(tempFilePath).resize({
                width: 400,
                height: 400
            }).withMetadata().toFile(outputImage);
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
        Post.find({ active: true }).skip(Number(offset)).limit(Number(limit))
            .populate(userQuery)
            .populate("likes", "username -_id")
            .populate(commentsQuery)
            .sort({ dateCreated: 'desc' })
    ]);

    res.json({
        count,
        posts
    });
}

export const getPost = async (req: Request, res: Response) => {
    const { public_id } = req.params;
    const post = await Post.findOne({ public_id }).populate([
        userQuery,
        commentsQuery,
        {
            path: "likes",
            select: "username -_id"
        }
    ]);;
    res.json(post);
}

export const getPostByUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    const _user = await User.findOne({ username });
    let posts: IPost[] = [];
    if (_user) {
        posts = await Post.find({ user: _user._id }).populate([
            commentsQuery,
            userQuery,
            likesQuery
        ]).sort({ dateCreated: 'desc' });
    } else {
        res.status(400).json({ message: "Doesn't exists a user with that username" });
    }

    res.json(posts);
}

export const putPost = async (req: Request, res: Response) => {
    const { _id, dateCreated, user, img, ...data }: IPost = req.body
    const { public_id } = req.params;
    const post = await Post.findOneAndUpdate({ public_id }, data, { new: true });
    res.json(post);
}

export const putLike = async (req: Request, res: Response) => {
    const { public_id } = req.params;
    const post = await Post.findOne({ public_id });
    let currenPost: IPost;
    if (post?.likes.some((user: mongoose.Types.ObjectId) => user.equals(req.currentUser._id))) {
        currenPost = await Post.findOneAndUpdate({ public_id }, { $inc: { likeCount: -1 }, $pull: { likes: req.currentUser._id } }, { new: true }).populate([
            userQuery,
            likesQuery,
            commentsQuery
        ]);
    } else {
        currenPost = await Post.findOneAndUpdate({ public_id }, { $inc: { likeCount: 1 }, $addToSet: { likes: req.currentUser } }, { new: true }).populate([
            userQuery,
            likesQuery,
            commentsQuery
        ]);
    }
    res.json(currenPost);
}

export const putDescription = async (req: Request, res: Response) => {
    const { public_id } = req.params;
    const { description } = req.body;
    const post = await Post.findOneAndUpdate({ public_id }, { description }, { new: true }).populate([
        userQuery,
        likesQuery,
        commentsQuery
    ]);
    res.json(post);
}

export const deletePost = async (req: Request, res: Response) => {
    const { public_id } = req.params;
    const post = await Post.findOne({ public_id });
    await Comment.deleteMany({ post: post?._id });
    await cloudinary.uploader.destroy(public_id);
    await Post.findOneAndDelete({ public_id }, { active: false });
    res.json(public_id);
}