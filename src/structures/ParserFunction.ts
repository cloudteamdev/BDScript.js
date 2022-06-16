import { Guild, Message } from "discord.js";
import { Booleans, Truthy } from "../constants";
import { Compiler } from "../core";
import { getArgRange, intoFunction, noop, transformArgs } from "../helpers";
import {
    ArgData,
    ArgType,
    CompiledFunctionData,
    ConditionData,
    DecideArgType,
    FunctionData,
    Nullable,
    ProcessedCompiledFunctionData,
    RuntimeErrorType,
    UnwrapTuple,
} from "../typings";
import { Regexes } from "../typings/namespaces";
import { RuntimeError } from "./errors/RuntimeError";
import { Return } from "./Return";
import { ThisParserFunction } from "./ThisParserFunction";

export class ParserFunction<Args extends [...ArgData[]] = []> {
    readonly data: FunctionData<Args>;
    compiledData?: ProcessedCompiledFunctionData;

    private executor: Nullable<ReturnType<typeof intoFunction>> = null;

    constructor(data: FunctionData<Args>, compiledData?: CompiledFunctionData) {
        this.data = data;
        if (compiledData !== undefined) {
            this.compiledData = this.#process(compiledData);
            if (compiledData.inside !== null) {
                this.executor = this.createImageFunction();
            }
        }
    }

    private createImageFunction() {
        const total = new Array<string>();

        for (let i = 0, len = this.data.args!.length; i < len; i++) {
            const field = this.compiledData!.fields[i];
            if (!field) {
                continue;
            }

            let raw = field.value;
            for (let x = 0, len2 = field.overloads.length; x < len2; x++) {
                const overload = field.overloads[x];
                raw = raw.replace(overload.compiledData!.id, overload.image);
            }

            total.push(`\${args[${i}] ?? '${raw.replaceAll(/'/g, "\\'")}'}`);
        }

        const fn = new Function(
            `args`,
            `return \`${this.data.name}[${total.join(";")}]\``
        ) as ReturnType<typeof intoFunction>;

        return fn;
    }

    #process(data: CompiledFunctionData): ProcessedCompiledFunctionData {
        return {
            ...data,
            fields: data.fields.map((c) => ({
                ...c,
                overloads: c.overloads.map((c) => ParserFunction.from(c)),
            })),
        };
    }

    // Not finished
    getConditionField(_position: number): Nullable<ConditionData> {
        return "" as any;
    }

    static from(data: CompiledFunctionData): ParserFunction<ArgData[]> {
        const d = Compiler.getNativeFunction(data.name);
        return new ParserFunction(d, data);
    }

    static create<Args extends [...ArgData[]] = []>(
        raw: FunctionData<Args>,
        compiled?: CompiledFunctionData
    ): ParserFunction<Args> {
        return new this(raw, compiled);
    }

    toJSON() {
        return this.data;
    }

    transformArgs(args: DecideArgType[]) {
        return transformArgs(
            this as unknown as ParserFunction<ArgData[]>,
            args
        );
    }

    /**
     * Returns an array of the provided arguments.
     * @param thisArg The `this` context of the function builder.
     */
    async resolveArray(
        thisArg: ThisParserFunction
    ): Promise<Return<RuntimeError | UnwrapTuple<Args> | null>> {
        const args = new Array() as UnwrapTuple<Args>;

        for (let i = 0, len = this.data.args!.length; i < len; i++) {
            const got = await this.resolveField(thisArg, i, args);
            if (!got.isSuccess()) {
                return got;
            }

            args[i] = got.value as UnwrapTuple<Args>[number];
        }

        return thisArg.success(args);
    }

    async resolveAll(
        thisArg: ThisParserFunction
    ): Promise<Return<RuntimeError | string | null>> {
        const arr = new Array(this.data.args!.length);

        for (let i = 0, len = this.compiledData?.fields.length!; i < len; i++) {
            const resolved = await this.resolveField(thisArg, i);
            if (!resolved.isSuccess()) {
                return resolved;
            }

            arr[i] = resolved.value;
        }

        return thisArg.success(arr.join(";"));
    }

    async resolveField<T extends number>(
        thisArg: ThisParserFunction,
        index: T,
        current = new Array<DecideArgType>()
    ): Promise<Return<RuntimeError | null | UnwrapTuple<Args>[T]>> {
        const field = this.fieldAt(index);

        const arg = this.data.args![index];

        if (!field)
            return thisArg.success((await arg.default?.(thisArg)) ?? null);

        const arr = new Array<string>(field.overloads.length);

        for (let i = 0, len = field.overloads.length; i < len; i++) {
            const overload = field.overloads[i];
            const got = await overload.data.execute.call(thisArg, overload);

            if (!got.isSuccess()) {
                return got;
            }

            arr[i] = got.value;
        }

        const total = field.executor!(arr);

        return (await this.parseArg(
            thisArg,
            current,
            arg,
            total
        )) as ReturnType<typeof this["resolveField"]>;
    }

    fieldAt(index: number) {
        return this.compiledData?.fields[index];
    }

    betaImage(params: DecideArgType[]) {
        if (!this.executor) return this.data.name;
        return this.executor(this.transformArgs(params));
    }

    get image(): string {
        let inside = this.compiledData!.inside;
        if (!this.data.brackets || inside === null) return this.data.name;

        for (let i = 0, len = this.compiledData!.fields.length; i < len; i++) {
            const field = this.fieldAt(i)!;
            for (let x = 0, len2 = field.overloads.length; x < len2; x++) {
                const overload = field.overloads[x];
                inside = inside!.replace(
                    overload.compiledData!.id,
                    overload.image
                );
            }
        }

        return `${this.data.name}[${inside}]`;
    }

    hasFields() {
        return this.compiledData!.fields.length !== 0;
    }

    private async parseArg(
        thisArg: ThisParserFunction,
        current: DecideArgType[],
        arg: ArgData,
        received: string | undefined
    ): Promise<Return<RuntimeError | DecideArgType>> {
        let data: DecideArgType =
            received! ?? (await arg.default?.(thisArg)) ?? null;

        if (typeof data !== "string" && data !== undefined) {
            return thisArg.success(data);
        }

        if (!arg.optional && data === undefined) {
            return thisArg.createRuntimeError(RuntimeErrorType.Required, [
                arg.name,
                this.betaImage([...current, data]),
            ]);
        }

        if (arg.optional && data === undefined) {
            return thisArg.success(null);
        }

        switch (arg.type) {
            case ArgType.Guild: {
                const g = thisArg.client.guilds.cache.get(data.trim());
                if (!g) {
                    return thisArg.createRuntimeError(RuntimeErrorType.Type, [
                        data,
                        ArgType[arg.type],
                        this.betaImage([...current, data]),
                    ]);
                }

                data = g;
                break;
            }

            case ArgType.Number: {
                const n = Number(data);

                if (isNaN(n)) {
                    return thisArg.createRuntimeError(RuntimeErrorType.Type, [
                        data,
                        ArgType[arg.type],
                        this.betaImage([...current, data]),
                    ]);
                }

                if (
                    (arg.min !== undefined && n < arg.min) ||
                    (arg.max !== undefined && n > arg.max)
                ) {
                    return thisArg.createRuntimeError(
                        RuntimeErrorType.NumberRange,
                        [
                            arg.name,
                            ArgType[arg.type],
                            getArgRange(arg),
                            this.betaImage([...current, data]),
                        ]
                    );
                }

                data = n;
                break;
            }

            case ArgType.String: {
                if (arg.choices !== undefined && arg.choices.length !== 0) {
                    return arg.choices.includes(data)
                        ? data
                        : thisArg.createRuntimeError(
                              RuntimeErrorType.InvalidChoice,
                              [arg.name, this.betaImage([...current, data])]
                          );
                }

                if (
                    (arg.min !== undefined && data.length < arg.min) ||
                    (arg.max !== undefined && data.length > arg.max)
                ) {
                    return thisArg.createRuntimeError(
                        RuntimeErrorType.StringRange,
                        [
                            arg.name,
                            ArgType[arg.type],
                            getArgRange(arg),
                            this.betaImage([...current, data]),
                        ]
                    );
                }
                break;
            }

            case ArgType.Boolean: {
                if (!Booleans.includes(data)) {
                    return thisArg.createRuntimeError(RuntimeErrorType.Type, [
                        arg.name,
                        ArgType[arg.type],
                        this.betaImage([...current, data]),
                    ]);
                }

                data = Truthy.includes(data);
                break;
            }

            case ArgType.User: {
                if (!Regexes.ID.test(data)) {
                    return thisArg.createRuntimeError(RuntimeErrorType.Type, [
                        arg.name,
                        ArgType[arg.type],
                        this.betaImage([...current, data]),
                    ]);
                }

                const user = await thisArg.client.users.fetch(data).catch(noop);

                if (!user) {
                    return thisArg.createRuntimeError(RuntimeErrorType.Type, [
                        arg.name,
                        ArgType[arg.type],
                        this.betaImage([...current, data]),
                    ]);
                }

                data = user;
                break;
            }

            case ArgType.Enum: {
                const chosen = arg.enum![data];
                if (chosen === undefined) {
                    return thisArg.createRuntimeError(RuntimeErrorType.Enum, [
                        arg.name,
                        this.betaImage([...current, data]),
                    ]);
                }

                data = chosen;
                break;
            }

            case ArgType.Role: {
                const ptr = current[arg.pointer!] as Guild;

                if (!Regexes.ID.test(data)) {
                    return thisArg.createRuntimeError(RuntimeErrorType.Type, [
                        arg.name,
                        ArgType[arg.type],
                        this.betaImage([...current, data]),
                    ]);
                }

                const role = ptr.roles.cache.get(data);

                if (!role)
                    return thisArg.createRuntimeError(RuntimeErrorType.Custom, [
                        `Failed to fetch role provided for argument '${
                            arg.name
                        }' in \`${this.betaImage([...current, data])}\`.`,
                    ]);

                data = role;

                break;
            }
        }
        return thisArg.success(data);
    }
}
