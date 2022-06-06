import { ClientOptions } from "discord.js";
import { PrefixOptions } from "./PrefixOptions";
export interface BotOptions {
    prefix: string | string[] | PrefixOptions;
    intents?: ClientOptions["intents"];
    client?: ClientOptions;
    token: string;
}
//# sourceMappingURL=BotOptions.d.ts.map