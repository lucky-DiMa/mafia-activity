import classes from './RightTable.module.css'
import CreatingRoomInterface from "../CreatingRoomInterface/CreatingRoomInterface.tsx";
import type {Room} from "../../schemas/RoomSchema.ts";
import type {User} from "../../schemas/UserSchema.ts";
import {useState} from "react";
import StartCreationRoomButton from "../StartCreatingRoomButton/StartCreationRoomButton.tsx";

interface RightTableProps {
    className: string;
    room?: Room | null;
    user?: User;
}

export default function RightTable({ room, user, className }: RightTableProps) {
    const [displayCreatingRoomInterface, setDisplayCreatingRoomInterface] = useState( false );

    function handleStartCreatingRoomButtonClick() {
        setDisplayCreatingRoomInterface(true);
    }

    function handleCancelCreatingRoomButtonClick() {
        setDisplayCreatingRoomInterface(false);
    }
    let content = null;
    if (user && !room) {
        // content = <CreatingRoomInterface onCancel={handleCancelCreatingRoomButtonClick}/>;
        if (displayCreatingRoomInterface) content = <CreatingRoomInterface onCancel={handleCancelCreatingRoomButtonClick}/>;
        else content = <StartCreationRoomButton onClick={handleStartCreatingRoomButtonClick}/>;
    }
    return (
        <div className={`${className} ${classes.rightTable}`}>
            { content }
        </div>
    )
}