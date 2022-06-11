import { Bot } from "../core";
import { intoFunction } from "../helpers";
import { Interpreter, ThisParserFunction } from "../structures";
import { OutputType, PresenceData, StatusData } from "../typings";
import FunctionManager from "./FunctionManager";

/**
 * Manages the client's status.
 */
export class StatusManager {
    #statuses: StatusData[] = [];
    #statusInterval: number = 12_000;
    #statusIndex = 0;

    constructor(private readonly bot: Bot) {}

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
        const compiled =
            data.name !== undefined ? FunctionManager.compile(data.name) : null;

        this.#statuses.push({
            ...data,
            executor: compiled
                ? intoFunction(compiled.getCompiledCode())
                : undefined,
            functions: compiled ? compiled.getFunctions() : undefined,
        });

        return this;
    }

    get client() {
        return this.bot.client;
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
    async #setStatus() {
        if (this.#statuses.length === 0) return;

        const { url, type, status, ...data } =
            this.#statuses[this.#statusIndex++] ??
            this.#statuses[(this.#statusIndex = 0)];

        let { name } = data;

        if (data.executor && data.functions) {
            const got = await Interpreter.run({
                args: [],
                ctx: {},
                bot: this.bot,
                executor: data.executor,
                functions: data.functions,
                output: OutputType.Code,
            });

            if (!got) return;
            name = got;
        }

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
    private _manage(): void {
        this.#setStatus();
        setInterval(this.#setStatus.bind(this), this.#statusInterval);
    }
}
