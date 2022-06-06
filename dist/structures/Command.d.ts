import { AnyCommandData, ArgData, CommandDataWithType, MessageCommand } from "../typings";
import { ParserFunction } from "./ParserFunction";
export declare class Command<T extends AnyCommandData> {
    id: number;
    data: T;
    functions: ParserFunction<ArgData[]>[];
    private executor;
    constructor(id: number, data: T);
    isMessageCommand(): this is Command<MessageCommand & CommandDataWithType>;
}
//# sourceMappingURL=Command.d.ts.map