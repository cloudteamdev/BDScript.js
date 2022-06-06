"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const typings_1 = require("../typings");
class Return {
    value;
    type;
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
    isSuccess() {
        return this.type === typings_1.ReturnType.Success;
    }
    isError() {
        return this.type === typings_1.ReturnType.Error;
    }
    static success(value) {
        return new this(value, typings_1.ReturnType.Success);
    }
    static get error() {
        return new this(null, typings_1.ReturnType.Error);
    }
}
exports.Return = Return;
//# sourceMappingURL=Return.js.map