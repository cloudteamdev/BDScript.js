import { ArgData, CompiledFunctionData, ConditionData, FunctionData, Nullable, ProcessedCompiledFunctionData, UnwrapTuple } from "../typings";
import { Return } from "./Return";
import { ThisParserFunction } from "./ThisParserFunction";
export declare class ParserFunction<Args extends [...ArgData[]] = []> {
    #private;
    readonly data: FunctionData<Args>;
    compiledData?: ProcessedCompiledFunctionData;
    constructor(data: FunctionData<Args>, compiledData?: CompiledFunctionData);
    getConditionField(_position: number): Nullable<ConditionData>;
    static from(data: CompiledFunctionData): ParserFunction<ArgData[]>;
    static create<Args extends [...ArgData[]] = []>(raw: FunctionData<Args>, compiled?: CompiledFunctionData): ParserFunction<Args>;
    toJSON(): FunctionData<Args>;
    resolveArray(thisArg: ThisParserFunction): Promise<Return<UnwrapTuple<Args> | null>>;
    resolveAll(thisArg: ThisParserFunction): Promise<Return<string | null>>;
    resolveField<T extends number>(thisArg: ThisParserFunction, index: T): Promise<Return<null | UnwrapTuple<Args>[T]>>;
    fieldAt(index: number): ProcessedCompiledFunctionData["fields"][number];
    private parseArg;
}
//# sourceMappingURL=ParserFunction.d.ts.map