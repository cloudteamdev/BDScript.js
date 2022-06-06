import { ArgData } from "../interfaces"
import { DecideArgType } from "./DecideArgType"

export type UnwrapTuple<T> = T extends [infer L, ...infer R] ? [Unwrap<L>, ...UnwrapTuple<R>] : []

export type Unwrap<T> = T extends ArgData<infer Type, infer Optional> ? DecideArgType<Type, Optional> : never