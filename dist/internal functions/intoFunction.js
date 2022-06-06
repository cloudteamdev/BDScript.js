"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoFunction = void 0;
function intoFunction(str) {
    str = str.replace(/`/g, '\\`');
    const matches = str.match(/SYSTEM_FUNCTION\((\d+)\)/g) ?? [];
    for (let i = 0, len = matches.length; i < len; i++) {
        str = str.replace(matches[i], "${args[" + i + "] ?? ''}");
    }
    return new Function('args', `return \`${str}\``);
}
exports.intoFunction = intoFunction;
//# sourceMappingURL=intoFunction.js.map