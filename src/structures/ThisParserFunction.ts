import { GuildMember, Message, TextBasedChannel, User } from "discord.js"
import { Nullable, OutputType, ThisParserFunctionData } from "../typings"
import { Container } from "./Container"
import { Return } from "./Return"

export class ThisParserFunction<T = unknown> {
    readonly data: ThisParserFunctionData<T>

    readonly #environment: Record<PropertyKey, unknown> = {}
    readonly #keywords: Record<string, string> = {}
    
    #user: Nullable<User> = null 
    #mainChannel: Nullable<TextBasedChannel> = null 

    constructor(data: ThisParserFunctionData<T>) {
        this.data = data
    }

    async manage<T extends Return>(rt: T, callback: (received: T extends Return<infer V> ? Exclude<V, null> : never) => Return): Promise<Return> {
        if (rt.isError()) {
            return rt 
        }

        return callback(rt.value)
    }

    get ctx() {
        return this.data.ctx
    }

    get mainChannel() {
        return this.#mainChannel ??= this.getMainChannel() 
    }

    get user() {
        return this.#user ??= this.getUser()
    }

    private getUser(): Nullable<User> {
        if (this.ctx instanceof User) {
            return this.ctx 
        } else if (this.ctx instanceof Message) {
            return this.ctx.author
        } else if (this.ctx instanceof GuildMember) {
            return this.ctx.user
        }

        return null 
    }

    private getMainChannel(): Nullable<TextBasedChannel> {  
        if (this.ctx instanceof Message) {
            return this.ctx.channel
        }

        return null
    }

    static create<T, O extends OutputType>(extras: Partial<ThisParserFunctionData<T, O>>) {
        return new this({
            args: extras.args ?? [],
            ctx: extras.ctx!,
            command: extras.command,
            executor: extras.executor!,
            functions: extras.functions!,
            bot: extras.bot!,
            container: extras.container ?? new Container()
        })
    }
}