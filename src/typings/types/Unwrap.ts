import { ArgData } from "../interfaces";
import { DecideArgType } from "./DecideArgType";
import { IsMethod } from "./IsMethod";

export type UnwrapTuple<T> = T extends [infer L, ...infer R]
    ? [Unwrap<L>, ...UnwrapTuple<R>]
    : [];

export type Unwrap<T> = T extends ArgData<
    infer Type,
    infer Optional,
    infer Enum,
    infer Choices
>
    ? IsMethod<T["default"]> extends true
        ?
              | DecideArgType<Type, false, Enum, Choices>
              | ReturnType<Exclude<T["default"], undefined>>
        : DecideArgType<Type, false, Enum, Choices>
    : never;
