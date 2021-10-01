import Comment from "../models/Comment";
import Post from "../models/Post";
import Role from "../models/Role";
import User from "../models/User"

export const userExists = async (id: string) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error(`The id doesn't exists`);
    }
}

export const userExistsByUsername = async (username: string) => {
    const user = await User.findOne({ username });
    if(!user){
        throw new Error(`The user ${username} doesn't exists`);
    }
}

export const postExists = async (id: string) => {
    const post = await Post.findById(id);
    if (!post) {
        throw new Error(`The id doesn't exists`);
    }
}

export const postExistsByPublicId = async (public_id: string) => {
    const post = await Post.findOne({ public_id });
    if (!post) {
        throw new Error(`The public id doesn't exists`);
    }
}

export const commentExists = async (public_id: string) => {
    const comment = await Comment.findOne({ public_id });
    if (!comment) {
        throw new Error(`The public id doesn't exists`);
    }
}

export const emailExists = async (email: string = "") => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error(`The email already exists`);
    }
}

export const usernameExists = async (username: string = "") => {
    const user = await User.findOne({ username });
    if (user) {
        throw new Error(`The username already exists`);
    }
}

export const isUserActive = async (id: string) => {
    const user = await User.findById(id);
    if (user && user.active === false) {
        throw new Error(`The user isn't active`);
    }
}

export const isRoleInDatabase = async (name = '') => {
    const roleExists = await Role.findOne({ name });

    if (!roleExists) {
        throw new Error(`The role ${name} doesn't exists in the database`);
    }
}