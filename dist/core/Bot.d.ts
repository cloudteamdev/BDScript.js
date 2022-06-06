import { Client } from "discord.js";
import { CommandManager, EventManager } from "../managers";
import { BotOptions } from "../typings";
export declare class Bot {
    #private;
    readonly options: BotOptions;
    readonly client: Client<true>;
    readonly events: EventManager;
    readonly commands: CommandManager;
    constructor(options: BotOptions);
    get prefixes(): string[];
    login(token?: string): void;
}
//# sourceMappingURL=Bot.d.ts.map