import {
    Guild,
    GuildMember,
    Message,
    TextBasedChannel,
    User,
} from "discord.js";
import { inspect } from "util";
import { hasProperty } from "../helpers";
import {
    Nullable,
    OutputType,
    ReturnType,
    RuntimeErrorType,
    ThisParserFunctionData,
} from "../typings";
import { Container } from "./Container";
import { RuntimeError } from "./errors/RuntimeError";
import { Return } from "./Return";

/**
 * Represents `this` in `ParserFunction.create()`.
 */
export class ThisParserFunction<T = unknown> {
    readonly data: ThisParserFunctionData<T>;

    readonly #environment: Record<PropertyKey, unknown> = {};
    readonly #keywords: Record<string, string> = {};

    /**
     * Holds the user. This is used for caching the `user` getter, so it doesn't have to repetitively call `ThisParserFunction.getUser()` every time the property is accessed.
     */
    #user: Nullable<User> = null;

    /**
     * Holds the guild. This is used for caching the `guild` getter, so it doesn't have to repetitively call `ThisParserFunction.getGuild()` every time the property is accessed.
     */
    #guild: Nullable<Guild> = null;

    /**
     * Holds the channel where this command was executed. This is used for caching the `mainChannel` getter, so it doesn't have to repetitively call `ThisParserFunction.getMainChannel()` every time the property is accessed.
     */
    #mainChannel: Nullable<TextBasedChannel> = null;

    /**
     * Create a new instance of `ThisParserFunction`.
     * @param data The data of `ThisParserFunction`.
     */
    constructor(data: ThisParserFunctionData<T>) {
        this.data = data;
    }

    /**
     * Used within function's internal code for managing function arguments.
     * @param rt The arguments to manage.
     * @param callback The callback to call with the arguments.
     * @returns The return value of the callback.
     */
    async manage<T extends Return>(
        rt: T,
        callback: (
            received: T extends Return<infer V>
                ? Exclude<V, null | RuntimeError>
                : never
        ) => Return | Promise<Return>
    ): Promise<Return> {
        if (!rt.isSuccess()) {
            return rt;
        }

        return await callback(rt.value);
    }

    /**
     * Sends a message, if possible.
     */
    notify(...args: unknown[]) {
        const out = args.map((c) => (typeof c === "string" ? c : inspect(c)));
        const channel = this.getMainChannel();
        if (!channel) {
            console.log(...out);
        } else {
            this.data.container.reset();
            this.data.container.send(out.join(" "), channel);
        }
    }

    /**
     * Returns the current channel.
     */
    get mainChannel() {
        return (this.#mainChannel ??= this.getMainChannel());
    }

    /**
     * Gets the current channel. It is only executed once, and only if the `mainChannel` property is used.
     * @returns The current channel or null.
     */
    private getMainChannel(): Nullable<TextBasedChannel> {
        if (this.ctx instanceof Message) {
            return this.ctx.channel;
        }

        return null;
    }

    /**
     * Returns the user executing this command.
     */
    get user() {
        return (this.#user ??= this.getUser());
    }

    /**
     * Gets the user executing this command. It is only executed once, and only if the `user` property is used.
     * @returns The current user or null.
     */
    private getUser(): Nullable<User> {
        if (this.ctx instanceof User) {
            return this.ctx;
        } else if (this.ctx instanceof Message) {
            return this.ctx.author;
        } else if (this.ctx instanceof GuildMember) {
            return this.ctx.user;
        }

        return null;
    }

    /**
     * Gets the current guild.
     */
    get guild(): Nullable<Guild> {
        return (this.#guild ??= this.getGuild());
    }

    /**
     * Gets the current guild, used for the `guild` property. It is only executed once, and only if the `guild` property is used.
     * @returns The current guild or null.
     */
    private getGuild(): Nullable<Guild> {
        return hasProperty(this.ctx, "guild") && this.ctx.guild instanceof Guild
            ? this.ctx.guild
            : null;
    }

    /**
     * Returns the execution context. This could be a `CommandInteraction`, `Message`, or anything else.
     */
    get ctx() {
        return this.data.ctx;
    }

    /**
     * Returns the discord.js client.
     */
    get client() {
        return this.bot.client;
    }

    /**
     * Returns the internal bot object which contains the `client`, `commands`, `events`, etc.
     */
    get bot() {
        return this.data.bot;
    }

    /**
     * Returns data about the command.
     */
    get command() {
        return this.data.command;
    }

    /**
     * Everything went as expected.
     * @param value The return value.
     */
    success<T>(value: T) {
        return Return["success"](value);
    }

    /**
     * Something went wrong.
     * @param why Why did this error happen?
     */
    error<T>(why: T) {
        return new Return(why, ReturnType.Return);
    }

    /**
     * Creates a runtime error.
     * @param type The type of error.
     * @param params The parameters of the error, used for the error's response message; indexed by the enum passed for `type`.
     */
    createRuntimeError(type: RuntimeErrorType, params: unknown[]) {
        return new Return(new RuntimeError(type, ...params), ReturnType.Error);
    }

    /**
     * Handles an unexpected return out of the function.
     * @param rt The error.
     */
    handleUnexpectedReturn(rt: Return) {
        const value = rt.value;

        if (value instanceof RuntimeError) {
            this.notify(value.message);
        }
        // We don't handle any other return types yet.
    }

    /**
     * Creates a new `ThisParserFunction`.
     */
    static create<T, O extends OutputType>(
        extras: Partial<ThisParserFunctionData<T, O>>
    ) {
        return new this({
            args: extras.args ?? [],
            ctx: extras.ctx!,
            command: extras.command,
            doNotSend: extras.doNotSend ?? false,
            executor: extras.executor!,
            functions: extras.functions!,
            bot: extras.bot!,
            container: extras.container ?? new Container(),
        });
    }
}
