import { Schema, model } from "mongoose";
import Comment from '../interfaces/Comment';

const CommentSchema: Schema = new Schema({
    public_id: {
        type: String,
        required: [true, 'Public id is required']
    },
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
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

CommentSchema.methods.toJSON = function () {
    const { _id, __v, active, ...data } = this.toObject();
    return data;
}

export default model<Comment>('Comment', CommentSchema);