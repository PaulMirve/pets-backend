import { Schema, model } from "mongoose";
import Post from "../interfaces/Post";


const PostSchema: Schema = new Schema({
    description: {
        type: String,
        required: [true, 'The caption is needed']
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String,
        required: [true, 'Image is required']
    },
    public_id: {
        type: String,
        required: [true, "Image public id is required"]
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
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }]
});

PostSchema.methods.toJSON = function () {
    const { _id, __v, ...data } = this.toObject();
    return data;
}


export default model<Post>('Post', PostSchema);