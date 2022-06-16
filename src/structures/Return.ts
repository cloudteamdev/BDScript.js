import { ReturnType } from "../typings";

export class Return<Value = any> {
    readonly value: Value;
    readonly type: ReturnType;

    /**
     * Create a new instance of `Return`.
     * @param value The value of the return.
     * @param type The type of the return.
     */
    constructor(value: Value, type: ReturnType) {
        this.value = value;
        this.type = type;
    }

    /**
     * Is this return value a success?
     * @returns Whether the type of this return is a success.
     */
    isSuccess() {
        return this.type === ReturnType.Success;
    }

    /**
     * Is this return value an error?
     * @returns Whether the type of this return is an error.
     */
    isError() {
        return this.type === ReturnType.Error;
    }

    /**
     * This method is no longer accessible this way.
     */
    private static success<T>(value: T) {
        return new this(value, ReturnType.Success);
    }

    /**
     * This getter is no longer accessible this way.
     */
    private static get error() {
        return new this(null, ReturnType.Error);
    }
}
