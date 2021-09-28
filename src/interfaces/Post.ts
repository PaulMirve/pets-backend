import { Document } from 'mongoose';
import User from './User';
import mongoose from 'mongoose';

export default interface Post extends Document {
    public_id: string,
    description: string,
    dateCreated: Date,
    img: string,
    likeCount: number,
    likes: mongoose.Types.ObjectId[],
    comments: mongoose.Types.ObjectId[],
    user: User,
    active: boolean
}