import { Document } from 'mongoose';
import User from './User';

export default interface Post extends Document {
    description: string,
    dateCreated: Date,
    img: string,
    likeCount: number
    user: User,
    active: true
}