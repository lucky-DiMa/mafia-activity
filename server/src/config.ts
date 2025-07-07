import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
    discord: {
        clientId: process.env.VITE_DISCORD_CLIENT_ID!,
        clientSecret: process.env.VITE_DISCORD_CLIENT_SECRET!,
    },
    mongo: {
        link: 'mongodb://localhost:27017/mafia-activity',
    }
} as const;