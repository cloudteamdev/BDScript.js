"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThisParserFunction = void 0;
const discord_js_1 = require("discord.js");
const Container_1 = require("./Container");
class ThisParserFunction {
    data;
    #environment = {};
    #keywords = {};
    #user = null;
    #mainChannel = null;
    constructor(data) {
        this.data = data;
    }
    async manage(rt, callback) {
        if (rt.isError()) {
            return rt;
        }
        return callback(rt.value);
    }
    get ctx() {
        return this.data.ctx;
    }
    get mainChannel() {
        return this.#mainChannel ??= this.getMainChannel();
    }
    get user() {
        return this.#user ??= this.getUser();
    }
    getUser() {
        if (this.ctx instanceof discord_js_1.User) {
            return this.ctx;
        }
        else if (this.ctx instanceof discord_js_1.Message) {
            return this.ctx.author;
        }
        else if (this.ctx instanceof discord_js_1.GuildMember) {
            return this.ctx.user;
        }
        return null;
    }
    getMainChannel() {
        if (this.ctx instanceof discord_js_1.Message) {
            return this.ctx.channel;
        }
        return null;
    }
    static create(extras) {
        return new this({
            args: extras.args ?? [],
            ctx: extras.ctx,
            command: extras.command,
            executor: extras.executor,
            functions: extras.functions,
            bot: extras.bot,
            container: extras.container ?? new Container_1.Container()
        });
    }
}
exports.ThisParserFunction = ThisParserFunction;
//# sourceMappingURL=ThisParserFunction.js.map