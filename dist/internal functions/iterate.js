"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate = void 0;
function iterate(iterable, fn) {
    let item;
    const arr = new Array();
    while (item = iterable.next()) {
        if (item.done) {
            break;
        }
        arr.push(fn(item.value));
    }
    return arr;
}
exports.iterate = iterate;
//# sourceMappingURL=iterate.js.map