import type {
    Channel,
    Guild,
    GuildChannel,
    GuildMember,
    Message,
    Role,
    Sticker,
    User,
} from "discord.js";
import { ArgType } from "../enums";
import { EnumLike } from "./EnumLike";
import { GetEnum } from "./GetEnum";
import { IsArray } from "./IsArray";
import { Nullable } from "./Nullable";

type IsTrue<T extends boolean> = T extends true
    ? T extends false
        ? false
        : true
    : false;

type MarkOptional<
    Type,
    Optional extends boolean,
    Rest extends boolean
> = IsTrue<Rest> extends true
    ? Type[]
    : Optional extends true
    ? Nullable<Type>
    : Type;

type GetArgType<
    Type extends ArgType,
    Enum extends EnumLike,
    Choices extends string[]
> = Type extends ArgType.Number
    ? number
    : Type extends ArgType.String
    ? IsArray<Choices> extends true
        ? Choices[number]
        : string
    : Type extends ArgType.Boolean
    ? boolean
    : Type extends ArgType.User
    ? User
    : Type extends ArgType.Guild
    ? Guild
    : Type extends ArgType.Role
    ? Role
    : Type extends ArgType.Channel
    ? Channel
    : Type extends ArgType.GuildChannel
    ? GuildChannel
    : Type extends ArgType.Message
    ? Message
    : Type extends ArgType.Member
    ? GuildMember
    : Type extends ArgType.Sticker
    ? Sticker
    : Type extends ArgType.Enum
    ? GetEnum<Enum>
    : never;

export type DecideArgType<
    Type extends ArgType = ArgType,
    Optional extends boolean = boolean,
    Enum extends EnumLike = EnumLike,
    Choices extends string[] = string[],
    Rest extends boolean = boolean
> = MarkOptional<GetArgType<Type, Enum, Choices>, Optional, Rest>;
