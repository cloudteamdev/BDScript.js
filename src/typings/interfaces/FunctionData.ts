import { ParserFunction, Return, ThisParserFunction } from "../../structures";
import { ArgType } from "../enums";
import { ArgData } from "./ArgData";

export interface FunctionData<Args extends [...ArgData[]] = []> {
    name: string;
    description: string;
    args?: [...Args];
    required?: boolean;
    returns?: ArgType;
    nullable?: boolean;
    brackets?: boolean;
    execute: (
        this: ThisParserFunction,
        fn: ParserFunction<Args>
    ) => Promise<Return>;
}
