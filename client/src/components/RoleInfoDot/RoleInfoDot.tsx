import classes from './RoleInfoDot.module.css';
import {useState} from "react";

interface RoleInfoDotProps {
    description: string;
    isLeft: boolean;

}

const RoleInfoDot = ({description, isLeft}: RoleInfoDotProps) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    }

    const handleMouseLeave = () => {
        setShowTooltip(false);
    }

    return (
        <div className={classes.infoDotContainer}>
            <div className={classes.infoDot}>
                i
            </div>
            {
                showTooltip &&
                <div className={`${classes.tooltip} ${isLeft ? ` ${classes.left}` : ""}`}>
                    {description}
                </div>
            }
        </div>
    );
};

export default RoleInfoDot;
