"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserFunction = void 0;
const core_1 = require("../core");
const typings_1 = require("../typings");
const Return_1 = require("./Return");
class ParserFunction {
    data;
    compiledData;
    constructor(data, compiledData) {
        this.data = data;
        if (compiledData !== undefined) {
            this.compiledData = this.#process(compiledData);
        }
    }
    #process(data) {
        return {
            ...data,
            fields: data.fields.map(c => ({
                ...c,
                overloads: c.overloads.map(c => ParserFunction.from(c))
            }))
        };
    }
    // Not finished
    getConditionField(_position) {
        return '';
    }
    static from(data) {
        const d = core_1.Compiler.getNativeFunction(data.name);
        return new ParserFunction(d, data);
    }
    static create(raw, compiled) {
        return new this(raw, compiled);
    }
    toJSON() {
        return this.data;
    }
    async resolveArray(thisArg) {
        const args = new Array(this.data.args.length);
        for (let i = 0, len = this.data.args.length; i < len; i++) {
            const arg = this.data.args[i];
            const value = await this.parseArg(thisArg, arg, this.compiledData.fields[i].value);
            if (value === undefined) {
                return Return_1.Return.error;
            }
            args[i] = arg;
        }
        return Return_1.Return.success(args);
    }
    async resolveAll(thisArg) {
        const arr = new Array(this.data.args.length);
        for (let i = 0, len = this.compiledData?.fields.length; i < len; i++) {
            const resolved = await this.resolveField(thisArg, i);
            if (resolved.isError()) {
                return resolved;
            }
            arr[i] = resolved.value;
        }
        return Return_1.Return.success(arr.join(';'));
    }
    async resolveField(thisArg, index) {
        const field = this.fieldAt(index);
        const arr = new Array(field.overloads.length);
        for (let i = 0, len = field.overloads.length; i < len; i++) {
            const overload = field.overloads[i];
            const got = await overload.data.execute.call(thisArg, overload);
            if (got.isError()) {
                return got;
            }
            arr[i] = got.value;
        }
        const arg = this.data.args[index];
        const total = field.executor(arr);
        const parsed = await this.parseArg(thisArg, arg, total);
        if (parsed === undefined) {
            return Return_1.Return.error;
        }
        return parsed;
    }
    fieldAt(index) {
        return this.compiledData?.fields[index];
    }
    async parseArg(thisArg, arg, received) {
        let data = received;
        if (!arg.optional) {
            data ??= await arg.default?.(thisArg);
            if (data === undefined) {
                return;
            }
        }
        switch (arg.type) {
            case typings_1.ArgType.Number: {
                break;
            }
            case typings_1.ArgType.String: {
                data = received;
                break;
            }
        }
        return data;
    }
}
exports.ParserFunction = ParserFunction;
//# sourceMappingURL=ParserFunction.js.map