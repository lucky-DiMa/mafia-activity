import classes from './StartCreationRoomButton.module.css';

interface StartCreationRoomButtonProps {
    onClick: () => void;
}

export default function StartCreationRoomButton({onClick}: StartCreationRoomButtonProps) {
    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.currentTarget.blur();
        onClick();
    }
    return (
        <button onClick={handleClick} className={classes.startCreatingRoomButton + " "  + classes.show + " green-button"}>
            Создать комнату
        </button>
    );
}