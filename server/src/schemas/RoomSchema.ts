import {Schema, model, Document, Types, Model} from "mongoose";
import {Server, Socket} from "socket.io";

export interface IRoom extends Document {
    _id: Types.ObjectId;
    creator: Types.ObjectId;
    users: Map<string, Types.ObjectId>;
    instanceId: string;
    rolesCount: {
        'Мафия': number,
        'Мирный житель': number,
        'Доктор': number,
        'Шериф': number,
        'Красотка': number,
        'Бессмертный': number,
        'Детектив': number,
        'Телохранитель': number,
        'Маньяк': number,
        'Оборотень': number,
        'Босс': number,
        'Охотник за головами': number,
        'Самозванец': number,
        'Свидетель': number,
        'Камикадзе': number,
    };
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
        type: Map,
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
        type: {'Мафия': Number,
            'Мирный житель': Number,
            'Доктор': Number,
            'Шериф': Number,
            'Красотка': Number,
            'Бессмертный': Number,
            'Детектив': Number,
            'Телохранитель': Number,
            'Маньяк': Number,
            'Оборотень': Number,
            'Босс': Number,
            'Охотник за головами': Number,
            'Самозванец': Number,
            'Свидетель': Number,
            'Камикадзе': Number},
        default: {'Мафия': 0,
            'Мирный житель': 0,
            'Доктор': 0,
            'Шериф': 0,
            'Красотка': 0,
            'Бессмертный': 0,
            'Детектив': 0,
            'Телохранитель': 0,
            'Маньяк': 0,
            'Оборотень': 0,
            'Босс': 0,
            'Охотник за головами': 0,
            'Самозванец': 0,
            'Свидетель': 0,
            'Камикадзе': 0}
    },
    state: {
        type: String,
        default: "WAITING_FOR_START",
        unique: false,
    },
    players: {
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
        },
        default: [],
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
