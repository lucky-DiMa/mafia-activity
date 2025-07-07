import classes from "./CreatingRoomInterface.module.css";
import RoleCountEditor from "../RoleCountEditor/RoleCountEditor.tsx";
import {useEffect, useState} from "react";
import * as React from "react";
import useFetch from "../../hooks/useFetch.ts";
import APIService from "../../utils/APIService.ts";
import InlineLoader from "../InlineLoader/InlineLoader.tsx";
import InlineErrorComponent from "../InlineErrorComponent/InlineErrorComponent.tsx";

interface CreatingRoomInterfaceProps {
    onCancel: () => void;
}

function CreatingRoomInterface({onCancel}: CreatingRoomInterfaceProps) {
    const [roleCounts, setRoleCounts] = useState<{roleName: string, roleCount: number, roleDescription: string}[]>([]);
    const [totalPlayers, setTotalPlayers] = useState<number>(0);
    const [fetchRoles, isLoading, error] = useFetch(async (controller: AbortController) => {
        const roles = await APIService.getRoles(controller);
        setRoleCounts(roles.map((role) => ({...role, roleCount: 0})));
    });
    useEffect(() => {
        const controller = new AbortController();
        fetchRoles(controller);
        return () => {
            controller.abort();
        };
    }, []);
    useEffect(() => {
        let newTotalPlayers = 0;
        roleCounts.forEach(roleCount => newTotalPlayers += roleCount.roleCount);
        setTotalPlayers(newTotalPlayers);
    }, [roleCounts]);

    function handleCountChange(roleNumber: number, count: number) {
        if (count < 0) count = 0;
        let nowRoleCount: number = roleCounts[roleNumber].roleCount;
        let add = count - nowRoleCount;
        add = Math.min(add, 50 - totalPlayers);
        count = nowRoleCount + add;
        setRoleCounts((counts) => counts.map((roleCount, i) => i === roleNumber ? {...roleCount, roleCount: count} : roleCount));
    }

    function handleCancelCreatingRoomButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.currentTarget.blur();
        onCancel();
    }

    function handleClearRoleCountersButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.currentTarget.blur();
        setRoleCounts(roleCounts.map((role) => {
            return {
                ...role,
                roleCount: 0
            }
        }))
    }

    return (
        <div className={classes.creatingRoomInterface + " " + classes.show}>
            <h2>Создание комнаты:</h2>
            {roleCounts && <div className={classes.roleCountEditorsGrid}>
                {roleCounts && roleCounts.map((roleCount, roleNumber) => <RoleCountEditor key={roleNumber} roleNumber={roleNumber} {...roleCount}
                                                                            onCountChange={handleCountChange}/>)}
            </div>}
            {isLoading && <InlineLoader message={"Загрузка ролей..."}/>}
            {error && <InlineErrorComponent message={"Ошибка получения ролей от сервера, пожалуйста, попробуйте позже или перзапустите активносте"}/>}
            <div className={classes.totalPlayers}>Общее количество участников: {totalPlayers} (не больше 50)</div>
            <div className={classes.creatingRoomInterfaceButtons}>
                <button className={"green-button"} disabled={totalPlayers <= 2}>Создать</button>
                <button className={"red-button"} onClick={handleCancelCreatingRoomButtonClick}>Отменить</button>
                <button className={"dark-red-button"} disabled={!Boolean(totalPlayers)} onClick={handleClearRoleCountersButtonClick}>Очистить</button>
            </div>
        </div>
    );
}

export default CreatingRoomInterface;