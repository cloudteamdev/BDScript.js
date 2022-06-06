import { ArgType } from "../enums";
declare type MarkOptional<Type, Optional extends boolean> = Optional extends true ? Type | undefined : Type;
declare type GetArgType<Type extends ArgType> = Type extends ArgType.Number ? number : Type extends ArgType.String ? string : never;
export declare type DecideArgType<Type extends ArgType, Optional extends boolean> = MarkOptional<GetArgType<Type>, Optional>;
export {};
//# sourceMappingURL=DecideArgType.d.ts.map