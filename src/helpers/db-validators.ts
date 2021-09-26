import Role from "../models/Role";
import User from "../models/User"

export const userExists = async (id: string) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error(`The id doesn't exists`);
    }
}

export const isUserActive = async (id: string) => {
    const user = await User.findById(id);
    if (user && user.state === false) {
        throw new Error(`The user isn't active`);
    }
}

export const isRoleInDatabase = async (name = '') => {
    const roleExists = await Role.findOne({ name });

    if (!roleExists) {
        throw new Error(`The role ${name} doesn't exists in the database`);
    }
}