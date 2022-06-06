"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCommands = void 0;
const internal_functions_1 = require("../internal functions");
const structures_1 = require("../structures");
const typings_1 = require("../typings");
function messageCommands(bot, message) {
    const prefix = bot.prefixes.find(c => message.content.startsWith(c));
    if (prefix === undefined)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift()?.toLowerCase();
    if (cmd === undefined)
        return;
    const commands = bot.commands.getMessageCommands().filter(c => c.data.name === cmd || (c.data.aliases !== undefined && c.data.aliases.includes(cmd)));
    if (commands.size === 0)
        return;
    (0, internal_functions_1.iterate)(commands.values(), (el) => {
        structures_1.Interpreter.run({
            args,
            bot,
            ctx: message,
            executor: el["executor"],
            command: el,
            functions: el.functions,
            output: typings_1.OutputType.None
        });
    });
}
exports.messageCommands = messageCommands;
//# sourceMappingURL=messageCommands.js.map