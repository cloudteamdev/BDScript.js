import { ParserFunction } from "../structures";
import { MatchedFunctionData, CompilerFunctionData, ArgData } from "../typings";
/**
 * The main instance of a compiler.
 */
export declare class Compiler<T extends unknown & {
    toString(): string;
}> {
    #private;
    static insensitive: boolean;
    private static BRACKET_FUNCTIONS;
    private static FUNCTIONS;
    private static REGEX;
    private code;
    private index;
    private functions;
    private reference?;
    result: string;
    /**
     * Instantiates a new compiler.
     * @param code The code to compile.
     */
    constructor(code: string, reference?: T);
    static getNativeFunction(name: string): import("../typings").FunctionData<ArgData<import("../typings").ArgType, boolean>[]>;
    getMatchedFunctions(): MatchedFunctionData[];
    private get systemID();
    static setFunctions(fns: Array<string | CompilerFunctionData>, insensitive?: boolean): boolean;
    private skip;
    private isDollar;
    private readFunctionFields;
    /**
     * Returns the compiled code.
     */
    getCompiledCode(): string;
    private push;
    /**
     * Compiles the code.
     */
    start(): this;
    private back;
    private isBracketOpen;
    private isBracketClosure;
    private isSemicolon;
    private isEscapeChar;
    private getPosition;
    private throw;
    private parseFunction;
    private createFunction;
    private next;
    private char;
    private eof;
    /**
     * Gets functions used in the code.
     */
    getFunctions(): ParserFunction<ArgData<import("../typings").ArgType, boolean>[]>[];
}
//# sourceMappingURL=Compiler.d.ts.map