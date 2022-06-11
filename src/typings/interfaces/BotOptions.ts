import { ClientOptions } from "discord.js";
import { PrefixOptions } from "./PrefixOptions";

/**
 * Options for the bot.
 * @property prefix The prefix or array of prefixes to use. You can also optionally pass an [PrefixOptions](./PrefixOptions.ts) object.
 * @property intents The client's intents.
 * @property client Additional options for the discord.js client.
 * @property token The bot's token.
 */
export interface BotOptions {
    prefix: string | string[] | PrefixOptions;
    intents?: ClientOptions["intents"];
    client?: ClientOptions;
    token: string;
}
