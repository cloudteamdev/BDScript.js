import { Bot } from "../core";

/**
 * Sends the "ready on client" message to the console.
 * @param bot Bot
 */
export default function (bot: Bot) {
    console.log(`Ready on client ${bot.client.user.tag}!`);
}
