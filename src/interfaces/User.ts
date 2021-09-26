import { Document } from "mongoose";

export default interface User extends Document {
    name: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    active: boolean,
    google: boolean
}