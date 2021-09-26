import User from './User';
import Post from './Post';
export default interface Comment {
    comment: string,
    dateCreated: Date,
    likeCount: number,
    user: User,
    post: Post
}