import User from './User';
import Post from './Post';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export default interface Comment extends Document {
    comment: string,
    dateCreated: Date,
    likeCount: number,
    likes: mongoose.Types.ObjectId[],
    user: User,
    post: Post,
    active: boolean
}