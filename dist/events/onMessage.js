"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("../handlers");
const createEventHandler_1 = require("../internal functions/createEventHandler");
exports.default = (0, createEventHandler_1.createEventHandler)("messageCreate", function (m) {
    (0, handlers_1.messageCommands)(this, m);
});
//# sourceMappingURL=onMessage.js.map