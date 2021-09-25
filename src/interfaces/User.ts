import { Document } from "mongoose";

export default interface User extends Document {
    name: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    state: boolean,
    google: boolean
}