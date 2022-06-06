import { Collection } from "discord.js";
import { Command } from "../structures";
import { AnyCommandData, CommandDataWithType, CommandTypes, MessageCommand } from "../typings";
export declare class CommandManager extends Collection<CommandTypes, Collection<number, Command<AnyCommandData>>> {
    #private;
    getMessageCommands(): Collection<number, Command<MessageCommand & CommandDataWithType>>;
    messageCommand(data: MessageCommand): this;
    private addRaw;
}
//# sourceMappingURL=CommandManager.d.ts.map