"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const core_1 = require("../core");
const config_json_1 = tslib_1.__importDefault(require("./config.json"));
const bot = new core_1.Bot({
    prefix: "!",
    token: config_json_1.default.token,
    intents: discord_js_1.IntentsBitField.Flags.GuildMessages | discord_js_1.IntentsBitField.Flags.Guilds | discord_js_1.IntentsBitField.Flags.MessageContent
});
bot.commands.messageCommand({
    name: "lol",
    code: "uwu $authorID"
});
bot.events.add("onMessage");
bot.login();
//# sourceMappingURL=client.js.map