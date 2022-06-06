"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const tslib_1 = require("tslib");
const internal_functions_1 = require("../internal functions");
const FunctionManager_1 = tslib_1.__importDefault(require("../managers/FunctionManager"));
const structures_1 = require("../structures");
function getString(c) {
    return typeof c === 'string' ? c : c.name;
}
/**
 * The main instance of a compiler.
 */
class Compiler {
    static insensitive = false;
    static BRACKET_FUNCTIONS = {};
    static FUNCTIONS = null;
    static REGEX = null;
    code;
    index = 0;
    functions = new Array();
    reference;
    #matches;
    #id = 0;
    result = '';
    /**
     * Instantiates a new compiler.
     * @param code The code to compile.
     */
    constructor(code, reference) {
        this.code = code;
        this.reference = reference;
        this.#matches = this.getMatchedFunctions();
    }
    static getNativeFunction(name) {
        return FunctionManager_1.default.nativeFunctions.get(name);
    }
    getMatchedFunctions() {
        const matches = this.code.matchAll(Compiler.REGEX);
        return (0, internal_functions_1.iterate)(matches, (el) => {
            const name = Compiler.insensitive ? getString(Compiler.FUNCTIONS.find(c => getString(c).toLowerCase() === el[0].toLowerCase())) : el[0];
            const has = Compiler.BRACKET_FUNCTIONS[name];
            const brackets = has === undefined ? false : has;
            return {
                name,
                brackets,
                position: el.index,
                size: el[0].length
            };
        });
    }
    get systemID() {
        return `SYSTEM_FUNCTION(${this.#id++})`;
    }
    static setFunctions(fns, insensitive = false) {
        if (Compiler.FUNCTIONS !== null)
            return false;
        Compiler.FUNCTIONS = fns.sort((x, y) => getString(y).length - getString(x).length);
        for (let i = 0, len = Compiler.FUNCTIONS.length; i < len; i++) {
            const fn = Compiler.FUNCTIONS[i];
            if (typeof fn === 'string') {
                continue;
            }
            if (!fn.brackets)
                continue;
            this.BRACKET_FUNCTIONS[fn.name] = fn.optional ? null : true;
        }
        Compiler.insensitive = insensitive;
        Compiler.REGEX = new RegExp(fns.map(c => typeof c === 'string' ? `\\${c}` : `\\${c.name}`).join('|'), `gm${insensitive ? 'i' : ''}`);
        return true;
    }
    skip(n) {
        this.index += n;
    }
    isDollar(s) {
        return s === '$';
    }
    readFunctionFields(raw) {
        let closed = false;
        let escape = false;
        this.skip(1);
        let len = 0;
        const ref = this.createFunction(raw.name, '', [
            {
                value: '',
                overloads: [],
                executor: null
            }
        ]);
        while (!this.eof()) {
            const char = this.next();
            if (escape) {
                ref.inside += char;
                ref.fields[len].value += char;
                escape = false;
                continue;
            }
            if (this.isEscapeChar(char)) {
                escape = true;
                continue;
            }
            else if (this.isDollar(char)) {
                if (this.#matches.length !== 0 && this.#matches[0].position === this.index - 1) {
                    this.index--;
                    const fn = this.parseFunction(false);
                    ref.inside += fn.id;
                    ref.fields[len].value += fn.id;
                    ref.fields[len].overloads.push(fn);
                }
                else {
                    ref.inside += char;
                    ref.fields[len].value += char;
                }
            }
            else if (this.isBracketClosure(char)) {
                closed = true;
                break;
            }
            else if (this.isSemicolon(char)) {
                ref.inside += char;
                ref.fields[len].executor = (0, internal_functions_1.intoFunction)(ref.fields[len].value);
                len++;
                ref.fields.push({
                    value: '',
                    overloads: [],
                    executor: null
                });
            }
            else {
                ref.inside += char;
                ref.fields[len].value += char;
            }
        }
        if (!closed) {
            this.throw(raw, `${raw.name} is missing closure bracket`);
        }
        return ref;
    }
    /**
     * Returns the compiled code.
     */
    getCompiledCode() {
        return this.result;
    }
    push(str) {
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
            typeof (got) === 'string' ?
                this.push(got)
                : got === null ? (this.push(this.code.slice(this.index)),
                    this.index = this.code.length) : (this.functions.push(structures_1.ParserFunction.from(got)),
                    this.push(got.id));
        }
        return this;
    }
    back() {
        return this.code[this.index - 1];
    }
    isBracketOpen(t) {
        return t === '[';
    }
    isBracketClosure(t) {
        return t === ']';
    }
    isSemicolon(t) {
        return t === ';';
    }
    isEscapeChar(t) {
        return t === '\\';
    }
    getPosition(ref) {
        let start = 0;
        const pos = {
            line: 1,
            column: 0
        };
        const limit = ref.position + 1;
        while (start !== limit) {
            const char = this.code[start++];
            char === '\n' ? (pos.line++,
                pos.column = 0) : pos.column++;
        }
        return pos;
    }
    throw(ref, err) {
        const pos = this.getPosition(ref);
        throw new CompileError(`${err} at ${pos.line}:${pos.column} ${this.reference ? `(from ${this.reference.toString()})` : ''}`);
    }
    parseFunction(allow = true) {
        const next = this.#matches.shift();
        if (!next)
            return null;
        const old = this.index;
        this.index = next.position;
        const isEscapeChar = this.back() === '\\';
        if (allow) {
            this.result += this.code.slice(old, isEscapeChar ? this.index - 1 : this.index);
        }
        this.index += next.size;
        return isEscapeChar ?
            next.name : next.brackets === false ?
            this.createFunction(next.name) :
            next.brackets === true ?
                !this.isBracketOpen(this.char()) ? this.throw(next, `${next.name} requires brackets`) :
                    this.readFunctionFields(next) :
                !this.isBracketOpen(this.char()) ? this.createFunction(next.name) :
                    this.readFunctionFields(next);
    }
    createFunction(name, inside = null, fields = []) {
        return {
            name,
            id: this.systemID,
            fields,
            inside
        };
    }
    next() {
        return this.code[this.index++] ?? null;
    }
    char() {
        return this.code[this.index] ?? null;
    }
    eof() {
        return this.char() === null;
    }
    /**
     * Gets functions used in the code.
     */
    getFunctions() {
        return this.functions;
    }
}
exports.Compiler = Compiler;
class CompileError extends Error {
    constructor(err) {
        super(err);
    }
}
//# sourceMappingURL=Compiler.js.map