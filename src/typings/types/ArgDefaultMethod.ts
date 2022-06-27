import { ThisParserFunction } from "../../structures";
import { ArgType } from "../enums";
import { DecideArgType } from "./DecideArgType";
import { EnumLike } from "./EnumLike";

export type ArgDefaultMethod<
    Type extends ArgType,
    Enum extends EnumLike,
    Choices extends string[]
> = (
    thisArg: ThisParserFunction
) =>
    | Promise<DecideArgType<Type, true, Enum, Choices>>
    | DecideArgType<Type, true, Enum, Choices>;
