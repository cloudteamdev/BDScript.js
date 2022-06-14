import type { Role, User } from "discord.js";
import { ArgType } from "../enums";

type MarkOptional<Type, Optional extends boolean> = Optional extends true
    ? Type | null
    : Type;

type GetArgType<Type extends ArgType> = Type extends ArgType.Number
    ? number
    : Type extends ArgType.String
    ? string
    : Type extends ArgType.Boolean
    ? boolean
    : Type extends ArgType.User
    ? User
    : Type extends ArgType.Role
    ? Role
    : never;

export type DecideArgType<
    Type extends ArgType,
    Optional extends boolean
> = MarkOptional<GetArgType<Type>, Optional>;
