import classes from "./RoleCountInput.module.css";
import React, {useState} from "react";

interface RoleCountInputProps {
    onCountChange: (roleNumber: number, count: number) => void;
    roleNumber: number;
    roleCount: number;
}

const RoleCountInput = ({roleCount, onCountChange, roleNumber}: RoleCountInputProps) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onCountChange(roleNumber, parseInt(e.target.value) || 0);
    }

    function handleIncButtonClick() {
        onCountChange(roleNumber, roleCount + 1);
    }

    function handleDecButtonClick() {
        onCountChange(roleNumber, roleCount - 1);
    }

    const [focused, setFocused] = useState<boolean>(false);

    function handleFocus() {
        setFocused(true);
    }

    function handleBlur() {
        setFocused(false);
    }

    return (
        <div className={`${classes.roleCountInputContainer}${focused ? ` ${classes.focused}` : ''}`}>
            <button className={`${classes.roleCountInputItem} ${classes.roleCountInputButton}`} onClick={handleDecButtonClick}>-</button>
            <input type={"number"} onFocus={handleFocus} onBlur={handleBlur}
                   className={`${classes.roleCountInputItem} ${classes.roleCountInput} ${classes.roleCountInputDecButton}`} value={roleCount.toString()} onChange={handleChange}/>
            <button className={`${classes.roleCountInputItem} ${classes.roleCountInputButton} ${classes.roleCountInputIncButton}`} onClick={handleIncButtonClick}>+</button>
        </div>
    );
};

export default RoleCountInput;