import type { Guild, Role, User } from "discord.js";
import { ArgType } from "../enums";
import { EnumLike } from "./EnumLike";
import { GetEnum } from "./GetEnum";
import { IsArray } from "./IsArray";

type MarkOptional<Type, Optional extends boolean> = Optional extends true
    ? Type | null
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
    : Type extends ArgType.Enum
    ? GetEnum<Enum>
    : never;

export type DecideArgType<
    Type extends ArgType = ArgType,
    Optional extends boolean = boolean,
    Enum extends EnumLike = EnumLike,
    Choices extends string[] = string[]
> = MarkOptional<GetArgType<Type, Enum, Choices>, Optional>;
