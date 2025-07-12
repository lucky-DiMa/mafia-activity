import {Schema, model, Document, Types, Model} from 'mongoose';
import {IRoomModel} from "./RoomSchema";

interface IUser extends Document {
    _id: Types.ObjectId;
    id: string;
    globalName: string;
    currentInstanceId: string;
    currentSocketId: string;
}

export interface IUserModel extends Model<IUser> {
    findByDiscordId(id: string): Promise<IUser | null>;
}

const UserSchema = new Schema<IUser, IUserModel>({
    _id: {type: Schema.Types.ObjectId, auto: true},
    id: {type: String, required: true},
    globalName: {type: String, required: true},
    currentInstanceId: {type: String, required: true},
    currentSocketId: {type: String, required: true}
});

UserSchema.statics.findByDiscordId = function (this: IUserModel, discordId: string) {
    return this.findOne({id: discordId})
}

export const User = model<IUser, IRoomModel>('User', UserSchema);