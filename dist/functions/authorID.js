"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
const typings_1 = require("../typings");
exports.default = structures_1.ParserFunction.create({
    name: "$authorID",
    description: "Returns the author's ID",
    returns: typings_1.ArgType.String,
    nullable: true,
    execute: async function () {
        return structures_1.Return.success(this.user?.id);
    }
});
//# sourceMappingURL=authorID.js.map