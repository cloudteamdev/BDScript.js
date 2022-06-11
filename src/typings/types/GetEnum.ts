import { EnumLike } from "./EnumLike";

export type GetEnum<T> = T extends EnumLike<infer E> ? E : never;
