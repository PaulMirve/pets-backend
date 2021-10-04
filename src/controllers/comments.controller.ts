import { Request, Response } from "express";
import Comment from '../models/Comment';
import IComment from '../interfaces/Comment';
import Post from "../models/Post";
import { commentsQuery, userQuery, postQuery, likesQuery } from '../database/querys';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

export const postComment = async (req: Request, res: Response) => {
    const { public_id } = req.params;
    const data: IComment = req.body;

    data.user = req.currentUser;
    const post = await Post.findOne({ public_id })
    data.post = post;
    const comment = new Comment(data);
    comment.public_id = uuidv4();
    await comment.save();
    await comment.populate([
        userQuery,
        likesQuery,
        postQuery
    ]);
    post?.comments.push(comment._id);
    await post?.save();
    res.json(comment);
}

export const putLikeComment = async (req: Request, res: Response) => {
    const { public_id } = req.params;
    const comment = await Comment.findOne({ public_id });
    let currentComment: IComment;
    if (comment?.likes.some((user: mongoose.Types.ObjectId) => user.equals(req.currentUser._id))) {
        currentComment = await Comment.findOneAndUpdate({ public_id }, { $inc: { likeCount: -1 }, $pull: { likes: req.currentUser._id } }, { new: true }).populate([
            userQuery,
            likesQuery,
            postQuery
        ]);
    } else {
        currentComment = await Comment.findOneAndUpdate({ public_id }, { $inc: { likeCount: 1 }, $addToSet: { likes: req.currentUser } }, { new: true }).populate([
            userQuery,
            likesQuery,
            postQuery
        ]);;
    }
    res.json(currentComment);
}