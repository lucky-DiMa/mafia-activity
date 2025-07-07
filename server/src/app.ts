import express, { Express, Request, Response } from 'express';
import { config } from "./config";
import {Server, Socket} from 'socket.io';
import { connectToMongo } from "./utils/mongodb";
import { Room } from './schemas/RoomSchema';
import rolesDescriptions from "./utils/rolesDescriptions";

(async () => await connectToMongo())()

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express + TypeScript!');
});

interface ApiTokenRequest extends Request {
    body: {
        code: string
    }
}

// Define the expected Discord OAuth response type
interface DiscordOAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

interface RoleDescriptionRequest extends Request {
    query: {
        role: string;
    };
}


app.post("/api/token", async (req: ApiTokenRequest, res: Response) => {
    try {
        console.log('Received POST /api/token');
        console.log(req.body.code)
        // First fetch the response
        const fetchResponse = await fetch(`https://discord.com/api/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: config.discord.clientId,
                client_secret: config.discord.clientSecret,
                grant_type: "authorization_code",
                code: req.body.code,
            }),
        });

        // if (!fetchResponse.ok) {
        //     throw new Error(`Discord API responded with status ${fetchResponse.status}`);
        // }

        const response: DiscordOAuthResponse = await fetchResponse.json();
        console.log(response);
        res.json({
            accessToken: response.access_token
        });
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({
            error: 'Failed to exchange code for token',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

app.get('/api/roles', async (req: Request, res: Response) => {
    let roles: {roleName: string, roleDescription: string}[] = [];
    for (let role in rolesDescriptions) {
        roles.push({roleName: role, roleDescription: rolesDescriptions[role]});
    }
    res.json({roles});
})

const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const wsServer = new Server(server, {
    cors: {
        origin: ["*"]
    }
});



interface DiscordUser {
    id: string,
    global_name: string,
    avatar?: string | null,
}

async function getDiscordUser(accessToken: string): Promise<DiscordUser> {
    const response = await fetch("https://discord.com/api/v9/users/@me", {
        method: 'GET',
        headers: {'Authorization': `Bearer ${accessToken}`}
    });
    return await response.json();
}

interface ListenEvents {
    'data-back': (data: any) => void;
}

interface EmitEvents {

}

interface ServerSideEvents {

}

interface SocketData {
    auth: {
        accessToken: string,
        instanceId: string,
    },
    discordUser: DiscordUser,
}

type SocketType = Socket<ListenEvents, EmitEvents, ServerSideEvents, SocketData>;

const authenticateSocket = async (socket: SocketType, next: (err?: Error | undefined) => void) => {
    try {
        const { accessToken, instanceId }: {accessToken?: string, instanceId?: string} = socket.handshake.auth;

        if (!accessToken || !instanceId) {
            return next(new Error('Unauthorized: Missing authentication data'));
        }

        const discordUser = await getDiscordUser(accessToken);

        if (!discordUser || !discordUser.id) {
            return next(new Error('Unauthorized: Invalid access token.'));
        }

        socket.data.auth = {
            accessToken,
            instanceId,
        };

        socket.data.discordUser = discordUser;

        // Allow the connection
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        next(new Error('Internal Server Error: Authentication failed.'));
    }
};

wsServer.use(authenticateSocket);

wsServer.on('connection', (socket: SocketType) => {
    console.log('Connected ');
    console.log(socket.data.discordUser.global_name);
    socket.on('data-back', (data: any) => {
        console.log(data);
    })

})