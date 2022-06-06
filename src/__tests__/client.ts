import { IntentsBitField } from "discord.js";
import { Bot } from "../core";
import config from "./config.json"

const bot = new Bot({
    prefix: "!",
    token: config.token,
    intents: IntentsBitField.Flags.GuildMessages | IntentsBitField.Flags.Guilds | IntentsBitField.Flags.MessageContent
})

bot.commands.messageCommand({
    name: "lol",
    code: "uwu $authorID"
})

bot.events.add("onMessage")

bot.login()
