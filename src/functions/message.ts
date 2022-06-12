import { Message } from "discord.js";
import { ParserFunction } from "../structures";
import { ArgType, RuntimeErrorType } from "../typings";

export default ParserFunction.create({
    name: "$message",
    description: "Returns the message contents.",
    returns: ArgType.String,
    nullable: true,
    execute: async function () {
        const context = this.ctx as Message;

        if ("content" in context) {
            return this.success(context.content.split(/\s+/g).slice(1));
        }

        return this.createRuntimeError(RuntimeErrorType.Custom, [
            "This context doesn't have a content property.",
        ]);
    },
});
