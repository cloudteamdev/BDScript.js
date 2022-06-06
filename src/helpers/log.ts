import { Bot } from "../core";

export default function(bot: Bot) {
    console.log(`Ready on client ${bot.client.user.tag}!`)
}