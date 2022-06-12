import { intoFunction } from "../helpers";
import FunctionManager from "../managers/FunctionManager";
import {
    AnyCommandData,
    ArgData,
    CommandDataWithType,
    CommandType,
    MessageCommand,
} from "../typings";
import { ParserFunction } from "./ParserFunction";

/**
 * Represents a command.
 */
export class Command<T extends AnyCommandData> {
    id: number;
    data: T;
    functions: ParserFunction<ArgData[]>[];

    private executor: ReturnType<typeof intoFunction>;

    /**
     * Construct a new command.
     * @param id The ID of this command.
     * @param data Data about the command.
     */
    constructor(id: number, data: T) {
        this.data = data;
        this.id = id;

        const compiler = FunctionManager.compile(data.code);
        this.functions = compiler.getFunctions();
        this.executor = intoFunction(compiler.getCompiledCode());
    }

    /**
     * Returns whether or not this command is a message command.
     */
    isMessageCommand(): this is Command<MessageCommand & CommandDataWithType> {
        return this.data.type === CommandType.MessageCommand;
    }
}
