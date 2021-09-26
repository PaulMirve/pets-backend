import User from './User';
import Post from './Post';
import { Document } from 'mongoose';

export default interface Comment extends Document {
    comment: string,
    dateCreated: Date,
    likeCount: number,
    user: User,
    post: Post,
    active: boolean
}