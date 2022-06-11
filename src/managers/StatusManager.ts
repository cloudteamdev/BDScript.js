import { Client } from "discord.js";
import { PresenceData } from "../typings";

/**
 * Manages the client's status.
 */
export class StatusManager {
    #statuses: PresenceData[] = [];
    #statusInterval: number = 12_000;
    #statusIndex = 0;

    /**
     * @param client The client to set the statuses on.
     */
    constructor(private client: Client<true>) {
        this.client = client;
    }

    /**
     * Add a status to the bot.
     * ```ts
     * bot.statuses.setInterval(13_000); //optional, defaults to 12_000 aka 12 seconds
     *
     * bot.statuses.add({
     *  status: "dnd",
     *  name: "I'm busy!",
     *  type: ActivityType.Playing,
     * });
     *
     * bot.statuses.add({
     *  status: "idle",
     *  name: "ok!",
     *  type: ActivityType.Playing,
     * });
     * ```
     * @param data The presence data to add.
     */
    add(data: PresenceData) {
        this.#statuses.push(data);
        return this;
    }

    /**
     * The interval between each status rotation, this is only used if you have more than one status added. Defaults to 12000ms.
     * @param interval The duration between each rotation in milliseconds. The minimum interval is 12000ms (12s).
     */
    setInterval(interval: number) {
        if (interval < 12_000) throw "Interval must be at least 12000ms (12s).";

        this.#statusInterval = interval;
        return this;
    }

    /**
     * Sets the bot's status.
     */
    #setStatus({ status, type, url, name }: PresenceData) {
        return this.client.user.setPresence({
            status,
            activities: [
                {
                    type,
                    url,
                    name,
                },
            ],
        });
    }

    /**
     * Manages the bot's status (i.e. status rotation, setting the initial status, etc). This is called automatically when the bot is logged in.
     */
    _manage(): void {
        const statuses = this.#statuses;

        const statusCount = statuses.length;
        if (statusCount === 0) return;

        this.#setStatus(statuses[0]);

        if (statusCount < 2) return;
        const interval = this.#statusInterval;
        setInterval(() => {
            const status =
                statuses[this.#statusIndex++] ??
                statuses[(this.#statusIndex = 0)];
            this.#setStatus(status);
        }, interval);
    }
}
