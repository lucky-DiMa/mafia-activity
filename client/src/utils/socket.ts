import {io, Socket} from 'socket.io-client';
import type {User} from './../schemas/UserSchema.ts';
import type {Room} from './../schemas/RoomSchema.ts';

interface ListenEvents {
    connect_error: (err: Error) => void;
    connect: () => void;
    'room-info': (data: { room?: Room | null }) => void;
    'new-join-request': (data: {user: User}) => void;
    'cancel-join-request': (data: {user: User}) => void;
    'user-joined': (data: {user: User}) => void;
    'user-left': (data: {user: User}) => void;
    'user-voted': (data: any) => void;
}

interface EmitEvents {
    'data-back': (data: any) => void;
    'user-voted': (data: any) => void;
    'user-choice': (data: any) => void;
    'start-night': (data: any) => void;
    'request-current-room': (callback: (response: any) => void) => void;
    'create-room': (data: any) => void;
}

const socket: Socket<ListenEvents, EmitEvents> = io('/', {
    path: '/.proxy/socket.io',
    autoConnect: false,
    transports: ['websocket']
});

export default socket;