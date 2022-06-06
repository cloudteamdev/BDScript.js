import { ClientEvents } from "discord.js";
import { Bot } from "../core";
declare type EventHandler<T extends keyof ClientEvents> = (this: Bot, ...args: ClientEvents[T]) => void | Promise<void>;
export declare function createEventHandler<T extends keyof ClientEvents>(event: T, callback: EventHandler<T>): [event: T, callback: EventHandler<T>];
export {};
//# sourceMappingURL=createEventHandler.d.ts.map