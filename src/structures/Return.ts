import { ReturnType } from "../typings";

export class Return<Value = any> {
    readonly value: Value;
    readonly type: ReturnType;

    constructor(value: Value, type: ReturnType) {
        this.value = value;
        this.type = type;
    }

    isSuccess() {
        return this.type === ReturnType.Success;
    }

    isError() {
        return this.type === ReturnType.Error;
    }

    static success<T>(value: T) {
        return new this(value, ReturnType.Success);
    }

    static get error() {
        return new this(null, ReturnType.Error);
    }
}
