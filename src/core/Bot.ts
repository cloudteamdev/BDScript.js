import { Client } from "discord.js";
import log from "../helpers/log";
import { CommandManager, EventManager } from "../managers";
import { BotOptions } from "../typings";

export class Bot {
    readonly options: BotOptions;
    readonly client: Client<true>;

    #prefixes: string[] = [];

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
     * Logins this client into Discord.
     * @param token The token to login with. If omitted, the token provided in the constructor will be used.
     */
    login(token = this.options.token) {
        this.#registerDefaultReadyEvent();
        this.client
            .login(token)
            .catch((err) =>
                console.error("Failed to login to Discord.\n", err)
            );
    }
}
