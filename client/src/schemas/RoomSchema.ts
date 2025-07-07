import type {User} from "./UserSchema";
import type {PlayerStripped} from "./PlayerSchema";

interface Room  {
    users: Record<string, User>,
    rolesCount: Record<string, number>,
    players: Record<string, PlayerStripped>,
}

export type {Room};