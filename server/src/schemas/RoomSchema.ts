import {Schema, model, Document, Types, Model} from "mongoose";
import {Server, Socket} from "socket.io";

export interface IRoom extends Document {
    _id: Types.ObjectId;
    creator: Types.ObjectId;
    users: Map<string, Types.ObjectId>;
    instanceId: string;
    rolesCount: Map<string, number>;
    state: string;
    players: Record<string, {
        alive: boolean;
        role: string;
        put_on_voting: number;
        voted: number;
        available_to_put_on_voting: boolean;
        action_player: number;
        boss_check: boolean;
        boss_check_player: number;
        bonus_kill: number;
        bonus_kill_player: number;
        healed_self: boolean;
    }>;
    isCreator(uId: Types.ObjectId): boolean;
    emitToSockets(server: Server, event: any, data: any): void;
    joinSocket(socket: any): void;
}

export interface IRoomModel extends Model<IRoom> {
    findByInstanceId(iId: string): Promise<IRoom | null>;
    getRoles(): string[];
}

const roomSchema = new Schema<IRoom, IRoomModel>({
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    users: {
        type: Array<Schema.Types.ObjectId>,
        of: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        required: true,
        default: () => new Map(),

    },
    instanceId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    rolesCount: {
        type: Map,
        of: Number
    },
    state: {
        type: String,
        default: "WAITING_FOR_START",
        unique: false,
    },
    players: {
        type: Map,
        of: {
            type: {
                alive: Boolean,
                role: String,
                put_on_voting: Number,
                voted: Number,
                available_to_put_on_voting: Boolean,
                action_player: Number,
                boss_check: Boolean,
                boss_check_player: Number,
                bonus_kill: Number,
                bonus_kill_player: Number,
                healed_self: Boolean,
            }
        },
        default: {},
    }
})

roomSchema.statics.findByInstanceId = function (this: IRoomModel,
                                                iId: string) {
    return this.findOne({ instanceId: iId })
}

roomSchema.methods.isCreator = function (this: IRoom, uId: Types.ObjectId) {
    return uId === this.creator
}

roomSchema.methods.emitToSockets = function (server: Server, event: string, data: any) {
    server.to(this.instanceId).emit(event, data);
}

roomSchema.methods.joinSocket =  function (socket: Socket) {
    socket.join(this.instance_id)
}

roomSchema.statics.getRoles = function () {
    return Object.keys((roomSchema.paths.rolesCount as any).default());
}

export const Room = model<IRoom, IRoomModel>('rooms', roomSchema);
