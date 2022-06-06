"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const discord_js_1 = require("discord.js");
const structures_1 = require("../structures");
const typings_1 = require("../typings");
class CommandManager extends discord_js_1.Collection {
    getMessageCommands() {
        return this.ensure("MessageCommand", () => new discord_js_1.Collection());
    }
    messageCommand(data) {
        return this.addRaw({
            ...data,
            type: typings_1.CommandType.MessageCommand
        });
    }
    addRaw(...raw) {
        for (let i = 0, len = raw.length; i < len; i++) {
            const el = raw[i];
            if (Array.isArray(el)) {
                this.addRaw(el);
            }
            else {
                const col = this.ensure(this.#typeToString(el.type), () => new discord_js_1.Collection());
                const id = col.size;
                col.set(id, new structures_1.Command(id, el));
            }
        }
        return this;
    }
    #typeToString(value) {
        return typings_1.CommandType[value];
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=CommandManager.js.map