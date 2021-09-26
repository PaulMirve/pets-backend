import { Schema, model } from "mongoose";
import IRole from '../interfaces/Role';

const RoleSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'The role is required']
    }
});

RoleSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export default model<IRole>('Role', RoleSchema);