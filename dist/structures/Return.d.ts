import { ReturnType } from "../typings";
export declare class Return<Value = any> {
    readonly value: Value;
    readonly type: ReturnType;
    constructor(value: Value, type: ReturnType);
    isSuccess(): boolean;
    isError(): boolean;
    static success<T>(value: T): Return<T>;
    static get error(): Return<null>;
}
//# sourceMappingURL=Return.d.ts.map