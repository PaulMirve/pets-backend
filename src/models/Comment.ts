import { Schema, model } from "mongoose";
import Comment from '../interfaces/Comment';

const CommentSchema: Schema = new Schema({
    comment: {
        type: String,
        required: [true, 'Comment is needed']
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    likeCount: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user id is needed']
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'The post id is needed']
    }
});

export default model<Comment>('Comment', CommentSchema);