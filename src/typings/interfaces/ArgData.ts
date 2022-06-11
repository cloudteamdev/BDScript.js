import { ThisParserFunction } from "../../structures";
import { ArgType } from "../enums";
import { DecideArgType } from "../types";

/**
 * Data about a function argument.
 * @property `name` The name of the argument.
 * @property `description` The description of the argument.
 * @property `type` The type of the argument. Uses [ArgType](../enums/ArgType.ts) enum.
 * @property `optional` Whether the argument is optional.
 * @property `pointer` Unknown use.
 * @property `min` If the typeof the argument is number, this is the minimum value. If the typeof the argument is string, this is the minimum length. Else, this will be ignored.
 * @property `max` If the typeof the argument is number, this is the maximum value. If the typeof the argument is string, this is the maximum length. Else, this will be ignored.
 * @property `default` If the argument is optional and no value is given, this will be used. Should be an async function that resolves to the defined type.
 */
export interface ArgData<
    Type extends ArgType = ArgType,
    Optional extends boolean = boolean
> {
    name: string;
    optional?: Optional;
    type: Type;
    description: string;
    pointer?: number;
    min?: number;
    max?: number;
    default?: (
        value: ThisParserFunction
    ) => Promise<DecideArgType<Type, Optional>>;
}
