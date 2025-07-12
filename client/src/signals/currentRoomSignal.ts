import {signal} from "@preact/signals-react";
import type {Room} from "../schemas/RoomSchema.ts";
const currentRoomSignal = signal<Room | null>(null);
export default currentRoomSignal;
