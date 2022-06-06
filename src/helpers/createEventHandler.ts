import { ClientEvents } from "discord.js";
import { Bot } from "../core";

type EventHandler<T extends keyof ClientEvents> = (
    this: Bot,
    ...args: ClientEvents[T]
) => void | Promise<void>;

export function createEventHandler<T extends keyof ClientEvents>(
    event: T,
    callback: EventHandler<T>
): [event: T, callback: EventHandler<T>] {
    return [event, callback];
}
