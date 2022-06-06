import { OutputType, ThisParserFunctionData } from "../typings";
declare type DecideOutput<T extends OutputType> = T extends OutputType.None ? null : T extends OutputType.Code ? string : T extends OutputType.Container ? unknown : string;
export declare class Interpreter {
    private constructor();
    static run<T, P extends OutputType = OutputType>(data: Omit<ThisParserFunctionData<T, P>, "container">): Promise<DecideOutput<P>>;
}
export {};
//# sourceMappingURL=Interpreter.d.ts.map