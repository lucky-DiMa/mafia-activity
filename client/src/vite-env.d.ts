
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DISCORD_CLIENT_ID: string;
    // Add other environment variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}