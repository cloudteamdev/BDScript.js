import { ArgData } from "../interfaces";
import { DecideArgType } from "./DecideArgType";
export declare type UnwrapTuple<T> = T extends [infer L, ...infer R] ? [Unwrap<L>, ...UnwrapTuple<R>] : [];
export declare type Unwrap<T> = T extends ArgData<infer Type, infer Optional> ? DecideArgType<Type, Optional> : never;
//# sourceMappingURL=Unwrap.d.ts.map