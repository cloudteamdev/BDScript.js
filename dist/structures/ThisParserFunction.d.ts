import { User } from "discord.js";
import { Nullable, OutputType, ThisParserFunctionData } from "../typings";
import { Return } from "./Return";
export declare class ThisParserFunction<T = unknown> {
    #private;
    readonly data: ThisParserFunctionData<T>;
    constructor(data: ThisParserFunctionData<T>);
    manage<T extends Return>(rt: T, callback: (received: T extends Return<infer V> ? Exclude<V, null> : never) => Return): Promise<Return>;
    get ctx(): T;
    get mainChannel(): import("discord.js").DMChannel | import("discord.js").PartialDMChannel | import("discord.js").NewsChannel | import("discord.js").TextChannel | import("discord.js").ThreadChannel | import("discord.js").VoiceChannel | null;
    get user(): Nullable<User>;
    private getUser;
    private getMainChannel;
    static create<T, O extends OutputType>(extras: Partial<ThisParserFunctionData<T, O>>): ThisParserFunction<NonNullable<T>>;
}
//# sourceMappingURL=ThisParserFunction.d.ts.map