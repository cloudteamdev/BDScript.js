import { ArgData, CompilerFunctionData, FunctionData } from "../typings";
import { Compiler } from "../core/Compiler";
declare const _default: {
    readonly nativeFunctions: Map<string, FunctionData<ArgData[]>>;
    init(): void;
    asRaw(): CompilerFunctionData[];
    compile(code: string, reference?: any): Compiler<any>;
};
export default _default;
//# sourceMappingURL=FunctionManager.d.ts.map