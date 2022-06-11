import { EnumLike } from "../../typings";
import { RuntimeErrorType } from "../../typings/enums";
import { BaseError } from "./BaseError";

export class RuntimeError extends BaseError<EnumLike<RuntimeErrorType>> {}
