import { Schema, model } from "mongoose";
import IRole from '../interfaces/Role';

const RoleSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'The role is required']
    }
});

RoleSchema.methods.toJSON = function () {
    const { _id, __v, ...data } = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IRole>('Role', RoleSchema);