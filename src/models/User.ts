import { Schema, model } from "mongoose";
import IUser from '../interfaces/User';

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    lastName: {
        type: String,
        required: [true, 'The last name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    role: {
        type: String,
        required: [true, 'The role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { _id, __v, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model<IUser>('User', UserSchema);