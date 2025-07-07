import classes from './Table.module.css'
import LeftTable from "../LeftTable/LeftTable.tsx";
import RightTable from "../RightTable/RightTable.tsx";
import type {Room} from "../../schemas/RoomSchema.ts";
import type {User} from "../../schemas/UserSchema.ts";

interface TableProps {
    user?: User
    room?: Room | null
}

export default function Table({ user, room }: TableProps) {
    return (
        <div className={classes.table}>
            <LeftTable className={classes.inTable} user={user} />
            <RightTable className={classes.inTable} room={room} user={user} />
        </div>
    )
}