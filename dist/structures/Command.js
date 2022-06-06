"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const tslib_1 = require("tslib");
const internal_functions_1 = require("../internal functions");
const FunctionManager_1 = tslib_1.__importDefault(require("../managers/FunctionManager"));
const typings_1 = require("../typings");
class Command {
    id;
    data;
    functions;
    executor;
    constructor(id, data) {
        this.data = data;
        this.id = id;
        const compiler = FunctionManager_1.default.compile(data.code);
        this.functions = compiler.getFunctions();
        this.executor = (0, internal_functions_1.intoFunction)(compiler.getCompiledCode());
    }
    isMessageCommand() {
        return this.data.type === typings_1.CommandType.MessageCommand;
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map