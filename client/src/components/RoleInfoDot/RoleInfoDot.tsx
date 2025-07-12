import classes from './RoleInfoDot.module.css';
import {createPortal} from "react-dom";
import {useEffect, useRef, useState} from "react";
import {roleCountsContainerRefSignal} from "../../signals/roleCountsContainerRefSignal.ts";

interface RoleInfoDotProps {
    description: string;
    isLeft: boolean;

}

const RoleInfoDot = ({description}: RoleInfoDotProps) => {
    const infoDotRef = useRef<HTMLDivElement | null>(null);
    const [tooltipTop, setTooltipTop] = useState<number>(0);
    const [tooltipLeft, setTooltipLeft] = useState<number>(0);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [forceCloseTooltip, setForceCloseTooltip] = useState<boolean>(false);

    function updateTooltipPos() {
        if (!infoDotRef.current) return;
        setTooltipTop(infoDotRef.current.getBoundingClientRect().top - infoDotRef.current.getBoundingClientRect().height / 2);
        setTooltipLeft(infoDotRef.current.getBoundingClientRect().left + infoDotRef.current.getBoundingClientRect().width / 2);
    }

    function handleMouseEnter() {
        setShowTooltip(true);
        console.log('Entered');
    }

    function handleMouseLeave() {
        setShowTooltip(false);
        console.log('Leaved');
    }

    function handleContainerScroll() {
        setForceCloseTooltip(true);
    }

    function handleContainerScrollEnd() {
        setForceCloseTooltip(false);
    }

    useEffect(updateTooltipPos, [showTooltip]);
    useEffect(() => {
        if (!showTooltip) return;
        if (!roleCountsContainerRefSignal.value?.current) return;
        roleCountsContainerRefSignal.value.current.addEventListener('scroll', handleContainerScroll);
        roleCountsContainerRefSignal.value.current.addEventListener('scrollend', handleContainerScrollEnd);
        return () => {
            if (!roleCountsContainerRefSignal.value?.current) return;
            roleCountsContainerRefSignal.value.current.removeEventListener('scroll', handleContainerScroll);
            roleCountsContainerRefSignal.value.current.addEventListener('scrollend', handleContainerScrollEnd);}
    }, [showTooltip]);

    return (
        <div className={classes.infoDotContainer}>
            <div className={classes.infoDot} ref={infoDotRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseEnter}>
                i
            </div>
            {(showTooltip && !forceCloseTooltip) && createPortal(<div className={classes.tooltip} style={{
                top: `${tooltipTop}px`,
                left: `${tooltipLeft}px`
            }}>
                {description}
            </div>, document.body)}
        </div>
    );
};

export default RoleInfoDot;
