import { ArgType } from "../enums";

type MarkOptional<Type, Optional extends boolean> = Optional extends true
    ? Type | undefined
    : Type;

type GetArgType<Type extends ArgType> = Type extends ArgType.Number
    ? number
    : Type extends ArgType.String
    ? string
    : never;

export type DecideArgType<
    Type extends ArgType,
    Optional extends boolean
> = MarkOptional<GetArgType<Type>, Optional>;
