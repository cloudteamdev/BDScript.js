import {
    Guild,
    GuildMember,
    Message,
    TextBasedChannel,
    User,
} from "discord.js";
import { inspect } from "util";
import { createGzip } from "zlib";
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

export class ThisParserFunction<T = unknown> {
    readonly data: ThisParserFunctionData<T>;

    readonly #environment: Record<PropertyKey, unknown> = {};
    readonly #keywords: Record<string, string> = {};

    #user: Nullable<User> = null;
    #guild: Nullable<Guild> = null;
    #mainChannel: Nullable<TextBasedChannel> = null;

    constructor(data: ThisParserFunctionData<T>) {
        this.data = data;
    }

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

    get ctx() {
        return this.data.ctx;
    }

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

    handleUnexpectedReturn(rt: Return) {
        const value = rt.value;

        if (value instanceof RuntimeError) {
            this.notify(value.message);
        }
        // We don't handle any other return types yet.
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

    get mainChannel() {
        return (this.#mainChannel ??= this.getMainChannel());
    }

    get user() {
        return (this.#user ??= this.getUser());
    }

    private getGuild(): Nullable<Guild> {
        return hasProperty(this.ctx, "guild") && this.ctx.guild instanceof Guild
            ? this.ctx.guild
            : null;
    }

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

    get guild(): Nullable<Guild> {
        return (this.#guild ??= this.getGuild());
    }

    private getMainChannel(): Nullable<TextBasedChannel> {
        if (this.ctx instanceof Message) {
            return this.ctx.channel;
        }

        return null;
    }

    success<T>(value: T) {
        return Return["success"](value);
    }

    error<T>(why: T) {
        return new Return(why, ReturnType.Return);
    }

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

    createRuntimeError(type: RuntimeErrorType, params: unknown[]) {
        return new Return(new RuntimeError(type, ...params), ReturnType.Error);
    }
}
