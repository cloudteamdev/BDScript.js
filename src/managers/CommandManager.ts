import { Collection } from "discord.js";
import { Command } from "../structures";
import {
    AnyCommandData,
    CommandDataWithType,
    CommandType,
    CommandTypes,
    MessageCommand,
} from "../typings";

export class CommandManager extends Collection<
    CommandTypes,
    Collection<number, Command<AnyCommandData>>
> {
    getMessageCommands(): Collection<
        number,
        Command<MessageCommand & CommandDataWithType>
    > {
        return this.ensure("MessageCommand", () => new Collection());
    }

    /**
     * Creates a new message command.
     * @note **Requires the message intent and message event enabled.**
     * ```ts
     * bot.commands.messageCommand({ name: "lol", code: "uwu $authorID" });
     * ```
     * @param data Message command data.
     */
    messageCommand(data: MessageCommand) {
        return this.addRaw({
            ...data,
            type: CommandType.MessageCommand,
        });
    }

    private addRaw(...raw: AnyCommandData[] | AnyCommandData[][]) {
        for (let i = 0, len = raw.length; i < len; i++) {
            const el = raw[i];
            if (Array.isArray(el)) {
                this.addRaw(el);
            } else {
                const col = this.ensure(
                    this.#typeToString(el.type),
                    () => new Collection()
                );
                const id = col.size;
                col.set(id, new Command(id, el));
            }
        }
        return this;
    }

    #typeToString(value: CommandType): CommandTypes {
        return CommandType[value] as CommandTypes;
    }
}
