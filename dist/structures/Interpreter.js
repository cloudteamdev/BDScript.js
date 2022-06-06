"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const ThisParserFunction_1 = require("./ThisParserFunction");
class Interpreter {
    constructor() { }
    static async run(data) {
        const thisArg = ThisParserFunction_1.ThisParserFunction.create(data);
        const execution = new Array(thisArg.data.functions.length);
        for (let i = 0, len = execution.length; i < len; i++) {
            const fn = thisArg.data.functions[i];
            const got = await fn.data.execute.call(thisArg, fn);
            if (got.isError()) {
                return got.value;
            }
            execution[i] = got.value;
        }
        const raw = thisArg.data.executor(execution);
        thisArg.data.container.send(raw, thisArg.mainChannel);
        return null;
    }
}
exports.Interpreter = Interpreter;
//# sourceMappingURL=Interpreter.js.map