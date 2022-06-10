import { Client } from "discord.js";
import log from "../helpers/log";
import { CommandManager, EventManager } from "../managers";
import type { BotOptions, PresenceData } from "../typings";

export class Bot {
    readonly options: BotOptions;
    readonly client: Client<true>;

    #prefixes: string[] = [];
    #statuses: PresenceData[] = [];
    #statusInterval: number = 12_000;
    #statusIndex = 0;

    readonly events = new EventManager(this);
    readonly commands = new CommandManager();

    constructor(options: BotOptions) {
        this.options = this.#validateOptions(options);

        this.client = new Client({
            intents: this.options.intents!,
            ...this.options.client,
        });
    }

    /**
     * Ensure that the provided options are valid and ready for use.
     * @param options The BotOptions to validate.
     * @returns Validated BotOptions
     */
    #validateOptions(options: BotOptions) {
        if (options.client?.intents !== undefined) {
            options.intents = options.client.intents;
        }

        return options;
    }

    /**
     * The bot's prefixes.
     */
    get prefixes(): string[] {
        return this.#prefixes;
    }

    /**
     * Registers default message printed when the client is ready.
     */
    #registerDefaultReadyEvent() {
        const count = this.client.listenerCount("ready");
        this.client.once("ready", (c) => {
            if (!count) {
                log(this);
            }

            this.#prefixes =
                typeof this.options.prefix === "string"
                    ? [this.options.prefix]
                    : Array.isArray(this.options.prefix)
                    ? this.options.prefix
                    : [
                          ...this.options.prefix.prefixes,
                          c.user.toString(),
                          // Don't mind deleting this line if the api never retrieves @!.
                          c.user.toString().replace("@", "@!"),
                      ];
        });
    }

    /**
     * Add a status to the bot.
     * ```ts
     * bot.setStatusInterval(13_000); //optional, defaults to 12_000 aka 12 seconds
     *
     * bot.addStatus({
     *  status: "dnd",
     *  name: "I'm busy!",
     *  type: ActivityType.Playing,
     * });
     *
     * bot.addStatus({
     *  status: "idle",
     *  name: "ok!",
     *  type: ActivityType.Playing,
     * });
     * ```
     * @param data The presence data to add.
     */
    addStatus(data: PresenceData) {
        this.#statuses.push(data);
        return this;
    }

    /**
     * The interval between each status rotation, this is only used if you have more than one status added. Defaults to 12000ms.
     * @param interval The duration between each rotation in milliseconds. The minimum interval is 12000ms (12s).
     */
    setStatusInterval(interval: number) {
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
    #manageStatus(): void {
        const statuses = this.#statuses;

        const statusCount = statuses.length;
        if (statusCount === 0) return;

        this.#setStatus(statuses[0]);

        if (statusCount < 2) return;
        const interval = this.#statusInterval;
        setInterval(() => {
            const index =
                statuses[++this.#statusIndex] !== undefined
                    ? this.#statusIndex
                    : 0;

            if (index === 0) this.#statusIndex = 0;

            this.#setStatus(statuses[index]);
        }, interval);
    }

    /**
     * Logins this client into Discord.
     * @param token The token to login with. If omitted, the token provided in the constructor will be used.
     */
    login(token = this.options.token) {
        this.#registerDefaultReadyEvent();
        this.client
            .login(token)
            .then(() => this.#manageStatus())
            .catch((err) =>
                console.error("Failed to login to Discord.\n", err)
            );
    }
}
