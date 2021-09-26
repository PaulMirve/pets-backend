import { Schema, model } from "mongoose";
import Post from "../interfaces/Post";


const PostSchema: Schema = new Schema({
    description: {
        type: String,
        required: [true, 'The caption is needed']
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    img: {
        type: String,
        required: [true, 'Image is required']
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
    }
});

export default model<Post>('Post', PostSchema);