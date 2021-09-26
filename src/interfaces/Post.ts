import User from './User';
export default interface Post {
    description: string,
    dateCreated: Date,
    img: string,
    likeCount: number
    user: User
}