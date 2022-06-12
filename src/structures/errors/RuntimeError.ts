import { EnumLike } from "../../typings";
import { RuntimeErrorType } from "../../typings/enums";
import { BaseError } from "./BaseError";

/**
 * Represents a runtime error.
 * @extends [BaseError](./BaseError.ts)
 */
export class RuntimeError extends BaseError<EnumLike<RuntimeErrorType>> {}
