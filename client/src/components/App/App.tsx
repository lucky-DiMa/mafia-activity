// import classes from './App.module.css'
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader.tsx";
import {useEffect, useState} from "react";
import discordSdk from "../../utils/discordSdk.ts";
import { config } from "../../config.ts";
import socket from "../../utils/socket.ts";
import Table from "../Table/Table.tsx";
import FullScreenErrorComponent from "../FullScreenErrorComponent/FullScreenErrorComponent.tsx";
import type {User} from "../../schemas/UserSchema.ts";
import type {Room} from "../../schemas/RoomSchema.ts";
import APIService from "../../utils/APIService.ts";

function App() {
    const [wsError, setWsError] = useState<boolean>(false);
    const [discordError, setDiscordError] = useState<boolean>(false);
    const [discordLoading, setDiscordLoading] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>(config.discord.clientId);
    const [user, setUser] = useState<User | undefined>({id: '2844', avatar: 'fsdlf', global_name: 'dfshfsdhfkhd'});
    // const [user, setUser] = useState<User | undefined>(undefined);
    const [room, setRoom] = useState<Room | null | undefined>(undefined);
    // const [player, setPlayer] = useState<Player | null | undefined>(undefined);

    function setupSocket(accessToken: string) {
        socket.auth = {accessToken: accessToken, instanceId: discordSdk.instanceId}
        socket.connect();
        socket.on('connect_error', (err: Error) => {
            setWsError(true);
            console.error(err);
        });
        socket.on('connect', () => {
            setWsError(false);
            // document.querySelector('#ws-connection-error').style.display = 'none';
        });
        // document.querySelector('#app').innerHTML = socket.connected.toString();
        socket.on('room-info', (data) => {
            setRoom(data.room);
            socket.emit('data-back', data);
        })
    }
    async function setupDiscord(): Promise<void> {
        setDiscordLoading(true);
        setDiscordError(false);
        setWsError(false);
        try {
            setMsg("Starting discord client2");
            const { code } = await discordSdk.commands.authorize({
                client_id: config.discord.clientId,
                response_type: "code",
                state: "",
                prompt: "none",
                scope: [
                    "identify",
                    "guilds",
                    "rpc.activities.write",
                ],
            });

            // Retrieve an access_token from your activity's server
            const accessToken = await APIService.getAccessToken(code);

            // Authenticate with Discord client (using the access_token)
            const auth = await discordSdk.commands.authenticate({
                access_token: accessToken,
            });

            if (auth === null) {
                setDiscordError(true);
                setDiscordLoading(false)
                return
            }


            try {
                const activityOptions = {
                    activity: {
                        type: 0,
                        details: 'Sitting in lobby',
                        state: 'Doing nothing'
                    }
                };

                await discordSdk.commands.setActivity(activityOptions);
            } catch  {
                setDiscordError(true);
                setDiscordLoading(false);
                return
            }
            setDiscordLoading(false);
            setDiscordError(false);
            setUser({id: auth.user.id, global_name: auth.user.global_name ? auth.user.global_name : auth.user.username, avatar: auth.user.avatar});
            setupSocket(accessToken);
        } catch {
            setDiscordError(true);
            setDiscordLoading(false);
            return
        }
    }

    useEffect(() => {
        (async () => {
            await discordSdk.subscribe("READY", setupDiscord);
            await discordSdk.ready();
        })();
    }, []);


    return (
        <>
            <Table user={user} room={room} />
            {discordError && <FullScreenErrorComponent message={'Ошибка discord, пожалуйста, попробуйте перезапустить активность' + msg} />}
            {discordLoading && <FullScreenLoader message={'Загрузка...'}/>}
            {wsError && <FullScreenErrorComponent message={"Переподключение к серверу, пожалуйста подождите или перезапустите активность"} />}
        </>
    );
}

export default App;