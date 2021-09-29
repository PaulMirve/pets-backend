import { Request, Response } from "express";
import Comment from '../models/Comment';
import IComment from '../interfaces/Comment';
import Post from "../models/Post";

export const postComment = async (req: Request, res: Response) => {
    const { public_id } = req.params;
    const data: IComment = req.body;

    data.user = req.currentUser;
    const post = await Post.findOne({ public_id })
    data.post = post;
    const comment = new Comment(data);
    await comment.save();
    post?.comments.push(comment._id);
    await post?.save().then(t => t.populate([
        {
            path: "comments",
            select: "comment",
            populate: [
                {
                    path: "user",
                    select: "username -_id"
                },
                {
                    path: "likes",
                    select: "username -_id"
                }
            ],
        },
        {
            path: "user",
            select: "username -_id"
        }
    ]));
    res.json(post);
}