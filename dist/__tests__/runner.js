"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const process_1 = require("process");
(0, child_process_1.fork)(`dist/__tests__/${process_1.argv.slice(2).join(' ')}`);
//# sourceMappingURL=runner.js.map