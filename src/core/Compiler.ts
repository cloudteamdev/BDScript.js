import { intoFunction, iterate } from "../helpers";
import FunctionManager from "../managers/FunctionManager";
import { ParserFunction } from "../structures";
import {
    CompiledFunctionData,
    MatchedFunctionData,
    FunctionPosition,
    FieldData,
    CompilerFunctionData,
    ArgData,
} from "../typings";

function getString(c: CompilerFunctionData | string): string {
    return typeof c === "string" ? c : c.name;
}

/**
 * The main instance of a compiler.
 */
export class Compiler<T extends unknown & { toString(): string }> {
    static insensitive = false;

    private static BRACKET_FUNCTIONS: Record<string, true | null> = {};
    private static FUNCTIONS: Array<string | CompilerFunctionData> | null =
        null;
    private static REGEX: RegExp | null = null;

    private code: string;
    private index = 0;
    private functions = new Array<ParserFunction<ArgData[]>>();

    private reference?: T;

    #matches: MatchedFunctionData[];
    #id = 0;

    result = "";

    /**
     * Instantiates a new compiler.
     * @param code The code to compile.
     */
    constructor(code: string, reference?: T) {
        this.code = code;
        this.reference = reference;
        this.#matches = this.getMatchedFunctions();
    }

    static getNativeFunction(name: string) {
        return FunctionManager.nativeFunctions.get(name)!;
    }

    getMatchedFunctions(): MatchedFunctionData[] {
        const matches = this.code.matchAll(Compiler.REGEX!);
        return iterate(matches, (el) => {
            const name = Compiler.insensitive
                ? getString(
                      Compiler.FUNCTIONS!.find(
                          (c) =>
                              getString(c).toLowerCase() === el[0].toLowerCase()
                      )!
                  )
                : el[0];

            const has = Compiler.BRACKET_FUNCTIONS[name];

            const brackets = has === undefined ? false : has;

            return {
                name,
                brackets,
                position: el.index!,
                size: el[0].length,
            };
        });
    }

    private get systemID() {
        return `SYSTEM_FUNCTION(${this.#id++})`;
    }

    static setFunctions(
        fns: Array<string | CompilerFunctionData>,
        insensitive = false
    ) {
        if (Compiler.FUNCTIONS !== null) return false;

        Compiler.FUNCTIONS = fns.sort(
            (x, y) => getString(y).length - getString(x).length
        );

        for (let i = 0, len = Compiler.FUNCTIONS.length; i < len; i++) {
            const fn = Compiler.FUNCTIONS[i];
            if (typeof fn === "string") {
                continue;
            }

            if (!fn.brackets) continue;

            this.BRACKET_FUNCTIONS[fn.name] = fn.optional ? null : true;
        }

        Compiler.insensitive = insensitive;

        Compiler.REGEX = new RegExp(
            fns
                .map((c) => (typeof c === "string" ? `\\${c}` : `\\${c.name}`))
                .join("|"),
            `gm${insensitive ? "i" : ""}`
        );

        return true;
    }

    private skip(n: number) {
        this.index += n;
    }

    private isDollar(s: string) {
        return s === "$";
    }

    private readFunctionFields(raw: MatchedFunctionData): CompiledFunctionData {
        let closed = false;
        let escape = false;

        this.skip(1);

        let len = 0;

        const ref = this.createFunction(raw.name, "", [
            {
                value: "",
                overloads: [],
                executor: null,
            },
        ]);

        while (!this.eof()) {
            const char = this.next()!;

            if (escape) {
                ref.inside += char;
                ref.fields[len].value += char;
                escape = false;
                continue;
            }

            if (this.isEscapeChar(char)) {
                escape = true;
                continue;
            } else if (this.isDollar(char)) {
                if (
                    this.#matches.length !== 0 &&
                    this.#matches[0].position === this.index - 1
                ) {
                    this.index--;
                    const fn = this.parseFunction(
                        false
                    ) as CompiledFunctionData;
                    ref.inside += fn.id;
                    ref.fields[len].value += fn.id;
                    ref.fields[len].overloads.push(fn);
                } else {
                    ref.inside += char;
                    ref.fields[len].value += char;
                }
            } else if (this.isBracketClosure(char)) {
                closed = true;
                break;
            } else if (this.isSemicolon(char)) {
                ref.inside += char;

                ref.fields[len].executor = intoFunction(ref.fields[len].value);
                len++;

                ref.fields.push({
                    value: "",
                    overloads: [],
                    executor: null,
                });
            } else {
                ref.inside += char;
                ref.fields[len].value += char;
            }
        }

        if (!closed) {
            this.throw(raw, `${raw.name} is missing closure bracket`);
        }

        ref.fields[len].executor = intoFunction(ref.fields[len].value);

        return ref;
    }

    /**
     * Returns the compiled code.
     */
    getCompiledCode(): string {
        return this.result;
    }

    private push(str: string) {
        this.result += str;

        return this;
    }

    /**
     * Compiles the code.
     */
    start() {
        if (!this.#matches.length) {
            this.result = this.code;
            return this;
        }

        while (!this.eof()) {
            const got = this.parseFunction();
            typeof got === "string"
                ? this.push(got)
                : got === null
                ? (this.push(this.code.slice(this.index)),
                  (this.index = this.code.length))
                : (this.functions.push(ParserFunction.from(got)),
                  this.push(got.id));
        }

        return this;
    }

    private back(): string {
        return this.code[this.index - 1];
    }

    private isBracketOpen(t: string) {
        return t === "[";
    }

    private isBracketClosure(t: string) {
        return t === "]";
    }

    private isSemicolon(t: string) {
        return t === ";";
    }

    private isEscapeChar(t: string) {
        return t === "\\";
    }

    private getPosition(ref: MatchedFunctionData): FunctionPosition {
        let start = 0;

        const pos: FunctionPosition = {
            line: 1,
            column: 0,
        };

        const limit = ref.position + 1;

        while (start !== limit) {
            const char = this.code[start++];

            char === "\n" ? (pos.line++, (pos.column = 0)) : pos.column++;
        }

        return pos;
    }

    private throw<T>(ref: MatchedFunctionData, err: string): T {
        const pos = this.getPosition(ref);
        throw new CompileError(
            `${err} at ${pos.line}:${pos.column} ${
                this.reference ? `(from ${this.reference.toString()})` : ""
            }`
        );
    }

    private parseFunction(allow = true): CompiledFunctionData | null | string {
        const next = this.#matches.shift();
        if (!next) return null;

        const old = this.index;

        this.index = next.position;

        const isEscapeChar = this.back() === "\\";

        if (allow) {
            this.result += this.code.slice(
                old,
                isEscapeChar ? this.index - 1 : this.index
            );
        }

        this.index += next.size;

        return isEscapeChar
            ? next.name
            : next.brackets === false
            ? this.createFunction(next.name)
            : next.brackets === true
            ? !this.isBracketOpen(this.char()!)
                ? this.throw(next, `${next.name} requires brackets`)
                : this.readFunctionFields(next)
            : !this.isBracketOpen(this.char()!)
            ? this.createFunction(next.name)
            : this.readFunctionFields(next);
    }

    private createFunction(
        name: string,
        inside: null | string = null,
        fields: FieldData<CompiledFunctionData>[] = []
    ): CompiledFunctionData {
        return {
            name,
            id: this.systemID,
            fields,
            inside,
        };
    }

    private next(): string | null {
        return this.code[this.index++] ?? null;
    }

    private char(): string | null {
        return this.code[this.index] ?? null;
    }

    private eof() {
        return this.char() === null;
    }

    /**
     * Gets functions used in the code.
     */
    getFunctions() {
        return this.functions;
    }
}

class CompileError extends Error {
    constructor(err: string) {
        super(err);
    }
}
