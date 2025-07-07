import classes from './LeftTable.module.css';
import Avatar from "../Avatar/Avatar.tsx";

interface LeftTableProps {
    className: string,
    user?: {
        id: string
        global_name: string,
        avatar?: string | null,
    }
}

export default function LeftTable({ user, className }: LeftTableProps) {
    console.log(className)
    return (
        <div className={className + " " + classes.leftTable}>
            {user && <><Avatar className={classes.selfAvatar} user_id={user.id} avatar={user.avatar}/><h1 className={classes.selfName}>{user.global_name}</h1></>}
        </div>
    )
}