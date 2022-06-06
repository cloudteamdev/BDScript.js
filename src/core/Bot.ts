import { Client } from "discord.js";
import log from "../helpers/log";
import { CommandManager, EventManager } from "../managers";
import { BotOptions } from "../typings";


export class Bot {
    readonly options: BotOptions
    readonly client: Client<true>

    #prefixes: string[] = []

    readonly events = new EventManager(this)
    readonly commands = new CommandManager()

    constructor(options: BotOptions) {
        this.options = this.#validateOptions(options)

        this.client = new Client({
            intents: this.options.intents!,
            ...this.options.client
        })
    }

    #validateOptions(options: BotOptions) {
        if (options.client?.intents !== undefined) {
            options.intents = options.client.intents
        }

        return options
    }

    get prefixes(): string[] {
        return this.#prefixes
    }

    #registerDefaultReadyEvent() {
        const count = this.client.listenerCount('ready')
        this.client.once("ready", (c) => {
            if (!count) {
                log(this)
            }

            this.#prefixes = typeof this.options.prefix === 'string' ? [
                this.options.prefix
            ] : Array.isArray(this.options.prefix) ? this.options.prefix :
            [
                ...this.options.prefix.prefixes,
                c.user.toString(),
                // Don't mind deleting this line if the api never retrieves @!.
                c.user.toString().replace('@', '@!')
            ]
        })
    }

    login(token = this.options.token) {
        this.#registerDefaultReadyEvent()
        this.client.login(token)
    }
}