export interface PlayerStripped {
    alive: boolean,
    put_on_voting: number,
    voted: number,
    available_to_put_on_voting: boolean,
}

export interface Player extends PlayerStripped {
    role: string,
    action_player: number,
    boss_check: boolean,
    boss_check_player: number,
    bonus_kill: number,
    bonus_kill_player: number,
    healed_self: boolean
}