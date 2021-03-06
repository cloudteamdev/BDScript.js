import { ClientEvents } from "discord.js";
import { Bot } from "../core";

type EventHandler<T extends keyof ClientEvents> = (
    this: Bot,
    ...args: ClientEvents[T]
) => void | Promise<void>;

/**
 * Creates a new event handler.
 * ```ts
 * createEventHandler("messageCreate", function (m) {
 *    messageCommands(this, m);
 * });
 * ```
 * @param event The event name.
 * @param callback Code to execute upon the event firing.
 */
export function createEventHandler<T extends keyof ClientEvents>(
    event: T,
    callback: EventHandler<T>
): [event: T, callback: EventHandler<T>] {
    return [event, callback];
}
