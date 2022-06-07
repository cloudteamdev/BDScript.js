import { ClientEvents } from "discord.js";
import { Bot } from "../core";
import { EventTypes, Method } from "../typings";

export class EventManager extends Array<EventTypes> {
    bot: Bot;

    constructor(bot: Bot) {
        super();
        this.bot = bot;
    }

    /**
     * Add a new event to listen for.
     * ```ts
     * bot.events.add("onReady", "onMessage");
     * bot.events.add("onMessage");
     * ```
     * @note Some events require special intents.
     * @param events The events to add.
     */
    add(...events: EventTypes[] | EventTypes[][]) {
        for (let i = 0, len = events.length; i < len; i++) {
            const ev = events[i];

            if (Array.isArray(ev)) {
                this.add(ev);
            } else {
                this.#import(ev)
                    .then((fn) => {
                        this.bot.client.on(fn[0], fn[1].bind(this.bot));
                    })
                    .catch(() => {
                        throw new Error(`Event ${ev} does not exist.`);
                    });
            }
        }

        return this;
    }

    async #import(
        eventName: EventTypes
    ): Promise<
        [keyof ClientEvents, Method<ClientEvents[keyof ClientEvents], any>]
    > {
        const c = await import(`../events/${eventName}`);
        return c.default;
    }
}
