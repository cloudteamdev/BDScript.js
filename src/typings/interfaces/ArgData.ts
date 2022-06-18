import { ThisParserFunction } from "../../structures";
import { ArgType } from "../enums";
import { ArgDefaultMethod, DecideArgType, EnumLike, GetEnum } from "../types";

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
    Optional extends boolean = boolean,
    Enum extends EnumLike = EnumLike,
    Choices extends string[] = string[]
> {
    /**
     * The name of the argument.
     */
    name: string;
    /**
     * Whether the argument is optional.
     */
    optional?: Optional;
    /**
     * The type of the argument. Uses [ArgType](../enums/ArgType.ts) enum.
     */
    type: Type;
    /**
     * The description of the argument.
     */
    description: string;
    /**
     * The argument which this argument uses internally to fetch the value. You need a `guildID` pointer for a `roleID`, to figure out that guild ot fetch the role in.
     * @note This uses numbers, so provide an argument index.
     */
    pointer?: number;
    /**
     * The possible choices for this argument.
     */
    choices?: Choices;
    /**
     * The enum.
     */
    enum?: Enum;
    /**
     * If the typeof the argument is number, this is the minimum value. If the typeof the argument is string, this is the minimum length. Else, this will be ignored.
     */
    min?: number;
    /**
     * If the typeof the argument is number, this is the maximum value. If the typeof the argument is string, this is the maximum length. Else, this will be ignored.
     */
    max?: number;
    /**
     * If the argument is optional and no value is given, this will be used. Should be an async function that resolves to the defined type.
     */
    default?: ArgDefaultMethod<Type, Enum, Choices>;
}
