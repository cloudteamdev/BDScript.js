import { Message } from "discord.js";
import { Bot } from "../core";
import { iterate } from "../helpers";
import { Interpreter } from "../structures";
import { OutputType } from "../typings";

export function messageCommands(bot: Bot, message: Message) {
    const prefix = bot.prefixes.find((c) => message.content.startsWith(c));

    if (prefix === undefined) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const cmd = args.shift()?.toLowerCase();

    if (cmd === undefined) return;

    const commands = bot.commands
        .getMessageCommands()
        .filter(
            (c) =>
                c.data.name === cmd ||
                (c.data.aliases !== undefined && c.data.aliases.includes(cmd))
        );

    if (commands.size === 0) return;

    iterate(commands.values(), (el) => {
        Interpreter.run({
            args,
            bot,
            ctx: message,
            executor: el["executor"],
            command: el,
            functions: el.functions,
            output: OutputType.None,
        });
    });
}
