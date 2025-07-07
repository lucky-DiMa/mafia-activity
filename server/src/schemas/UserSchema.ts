import {Schema, model, Document, Types} from 'mongoose';

interface IUser extends Document {
    _id: Types.ObjectId;
    id: string;
    globalName: string;
    currentInstanceId: string;
    currentSocketId: string;
}

const UserSchema = new Schema<IUser>({
    _id: {type: Schema.Types.ObjectId, auto: true},
    id: {type: String, required: true},
    globalName: {type: String, required: true},
    currentInstanceId: {type: String, required: true},
    currentSocketId: {type: String, required: true}
});

export const User = model<IUser>('User', UserSchema);