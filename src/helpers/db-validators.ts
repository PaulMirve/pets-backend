import User from "../models/User"

export const userExists = async (id: string) => {
    const user = await User.findById(id);
    if (!user || user.state === false) {
        throw new Error(`The id doesn't exists`);
    }
}