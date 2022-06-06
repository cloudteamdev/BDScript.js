"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const internal_functions_1 = require("../internal functions");
const Compiler_1 = require("../core/Compiler");
exports.default = new class {
    nativeFunctions = new Map();
    constructor() {
        this.init();
    }
    init() {
        const files = (0, fs_1.readdirSync)(`${__dirname}/../functions`);
        for (let i = 0, len = files.length; i < len; i++) {
            const file = files[i];
            if (!file.endsWith('.js'))
                continue;
            const fn = require("../functions/" + file).default;
            this.nativeFunctions.set(fn.data.name, fn.data);
        }
    }
    asRaw() {
        const arr = new Array(this.nativeFunctions.size);
        let i = 0;
        (0, internal_functions_1.iterate)(this.nativeFunctions.values(), (element) => {
            arr[i++] = {
                name: element.name,
                brackets: element.brackets,
                optional: !element.required
            };
        });
        return arr;
    }
    compile(...params) {
        if (Compiler_1.Compiler["FUNCTIONS"] === null) {
            Compiler_1.Compiler.setFunctions(Array.from(this.nativeFunctions.values()));
        }
        return new Compiler_1.Compiler(...params).start();
    }
}();
//# sourceMappingURL=FunctionManager.js.map