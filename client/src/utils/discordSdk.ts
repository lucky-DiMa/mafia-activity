import {DiscordSDK} from "@discord/embedded-app-sdk";
import {config} from "../config.ts";

const DiscordSdk = new DiscordSDK(config.discord.clientId);

export default DiscordSdk;