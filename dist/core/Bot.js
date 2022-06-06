"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const log_1 = tslib_1.__importDefault(require("../internal functions/log"));
const managers_1 = require("../managers");
class Bot {
    options;
    client;
    #prefixes = [];
    events = new managers_1.EventManager(this);
    commands = new managers_1.CommandManager();
    constructor(options) {
        this.options = this.#validateOptions(options);
        this.client = new discord_js_1.Client({
            intents: this.options.intents,
            ...this.options.client
        });
    }
    #validateOptions(options) {
        if (options.client?.intents !== undefined) {
            options.intents = options.client.intents;
        }
        return options;
    }
    get prefixes() {
        return this.#prefixes;
    }
    #registerDefaultReadyEvent() {
        const count = this.client.listenerCount('ready');
        this.client.once("ready", (c) => {
            if (!count) {
                (0, log_1.default)(this);
            }
            this.#prefixes = typeof this.options.prefix === 'string' ? [
                this.options.prefix
            ] : Array.isArray(this.options.prefix) ? this.options.prefix :
                [
                    ...this.options.prefix.prefixes,
                    c.user.toString(),
                    // Don't mind deleting this line if the api never retrieves @!.
                    c.user.toString().replace('@', '@!')
                ];
        });
    }
    login(token = this.options.token) {
        this.#registerDefaultReadyEvent();
        this.client.login(token);
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Bot.js.map