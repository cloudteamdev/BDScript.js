import { Compiler } from "../core";
import { ArgData, ArgType, CompiledFunctionData, ConditionData, DecideArgType, FunctionData, Nullable, ProcessedCompiledFunctionData, UnwrapTuple } from "../typings";
import { Return } from "./Return";
import { ThisParserFunction } from "./ThisParserFunction";

export class ParserFunction<Args extends [...ArgData[]] = []> {
    readonly data: FunctionData<Args>
    compiledData?: ProcessedCompiledFunctionData

    constructor(data: FunctionData<Args>, compiledData?: CompiledFunctionData) {
        this.data = data    
        if (compiledData !== undefined) {
            this.compiledData = this.#process(compiledData)
        }
    }

    #process(data: CompiledFunctionData): ProcessedCompiledFunctionData {
        return {
            ...data,
            fields: data.fields.map(c => (
                {
                    ...c,
                    overloads: c.overloads.map(c => ParserFunction.from(c))
                }
            ))
        }
    }

    // Not finished
    getConditionField(_position: number): Nullable<ConditionData> {
        return '' as any 
    }

    static from(data: CompiledFunctionData): ParserFunction<ArgData[]> {
        const d = Compiler.getNativeFunction(data.name)
        return new ParserFunction(d, data)
    }

    static create<Args extends [...ArgData[]] = []>(raw: FunctionData<Args>, compiled?: CompiledFunctionData): ParserFunction<Args> {
        return new this(raw, compiled)
    } 

    toJSON() {
        return this.data
    }

    async resolveArray(thisArg: ThisParserFunction): Promise<Return<UnwrapTuple<Args> | null>> {
        const args = new Array(this.data.args!.length) as UnwrapTuple<Args>

        for (let i = 0, len = this.data.args!.length;i < len;i++) {
            const arg = this.data.args![i]
            const value = await this.parseArg(thisArg, arg, this.compiledData!.fields[i].value)

            if (value === undefined) {
                return Return.error
            }

            args[i] = arg as UnwrapTuple<Args>[number]
        }

        return Return.success(args) 
    }

    async resolveAll(thisArg: ThisParserFunction): Promise<Return<string | null>> {
        const arr = new Array(this.data.args!.length)

        for (let i = 0, len = this.compiledData?.fields.length!;i < len;i++) {
            const resolved = await this.resolveField(thisArg, i)
            if (resolved.isError()) {
                return resolved
            }

            arr[i] = resolved.value
        }

        return Return.success(arr.join(';'))
    }

    async resolveField<T extends number>(thisArg: ThisParserFunction, index: T): Promise<Return<null | UnwrapTuple<Args>[T]>> {
        const field = this.fieldAt(index)

        const arr = new Array<string>(field.overloads.length)

        for (let i = 0, len = field.overloads.length;i < len;i++) {
            const overload = field.overloads[i]
            const got = await overload.data.execute.call(thisArg, overload)

            if (got.isError()) {
                return got 
            }

            arr[i] = got.value
        }
        
        const arg = this.data.args![index]

        const total = field.executor!(arr)

        const parsed = await this.parseArg(thisArg, arg, total)

        if (parsed === undefined) {
            return Return.error
        }

        return parsed as UnwrapTuple<Args>[T]
    }

    fieldAt(index: number): ProcessedCompiledFunctionData["fields"][number] {
        return this.compiledData?.fields[index]!
    }

    private async parseArg(thisArg: ThisParserFunction, arg: ArgData, received: string | undefined): Promise<DecideArgType<ArgType, boolean> | undefined> {
        let data: DecideArgType<ArgType, boolean> | undefined = received;

        if (!arg.optional) {
            data ??= await arg.default?.(thisArg)

            if (data === undefined) {
                return;
            }
        }

        switch (arg.type) {
            case ArgType.Number: {
                break
            }

            case ArgType.String: {
                data = received
                break;
            }
        }

        return data
    }
}