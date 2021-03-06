import { OutputType, ThisParserFunctionData } from "../typings";
import { Container } from "./Container";
import { ThisParserFunction } from "./ThisParserFunction";

type DecideOutput<T extends OutputType> =
    | (T extends OutputType.None
          ? null
          : T extends OutputType.Code
          ? string
          : T extends OutputType.Container
          ? Container
          : string)
    | null;

export class Interpreter {
    private constructor() {}

    /**
     * Runs the Interpreter.
     */
    static async run<T, P extends OutputType = OutputType>(
        data:
            | ThisParserFunctionData<T, P>
            | Omit<ThisParserFunctionData<T, P>, "container">
    ): Promise<DecideOutput<P>> {
        /**
         * Represents this function data as [`ThisParserFunction`](./ThisParserFunction.ts).
         */
        const thisArg = ThisParserFunction.create(data);

        const execution = new Array(thisArg.data.functions.length);

        for (let i = 0, len = execution.length; i < len; i++) {
            const fn = thisArg.data.functions[i];

            const got = await fn.data.execute.call(thisArg, fn);

            if (!got.isSuccess()) {
                thisArg.handleUnexpectedReturn(got);
                return null;
            }

            execution[i] = got.value as string;
        }

        const raw = thisArg.data.executor(execution);

        if (thisArg.data.doNotSend !== true) {
            thisArg.data.container.send(raw, thisArg.mainChannel);
        }

        return (
            thisArg.data.output === undefined ||
            thisArg.data.output === OutputType.Code
                ? raw
                : thisArg.data.output === OutputType.None
                ? null
                : thisArg.data.container
        ) as DecideOutput<P>;
    }
}
