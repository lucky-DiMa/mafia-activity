import classes from "./RoleCountEditor.module.css"
import RoleCountInput from "../RoleCountInput/RoleCountInput.tsx";
import RoleInfoDot from "../RoleInfoDot/RoleInfoDot.tsx";

interface RoleCountEditorProps {
    roleName: string,
    roleCount: number,
    roleNumber: number,
    roleDescription: string,
    onCountChange: (roleNumber: number, count: number) => void,
    key: number,
}

export default function RoleCountEditor({roleCount, roleName, roleNumber, onCountChange, roleDescription}: RoleCountEditorProps) {
    const animationDelay = 0.1 * roleNumber;

    return (
        <div
            key={roleNumber}
            className={classes.roleCountEditor}
            style={{animationDelay: `${animationDelay}s`}}
        >
            <RoleInfoDot description={roleDescription} isLeft={roleNumber % 2 === 0}/>
            {roleName}
            <RoleCountInput onCountChange={onCountChange} roleNumber={roleNumber} roleCount={roleCount}/>
        </div>
    );
}
