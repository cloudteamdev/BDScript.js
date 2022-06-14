import { Message } from "discord.js";
import { ParserFunction } from "../structures";
import { ArgType, RuntimeErrorType } from "../typings";

export default ParserFunction.create({
    name: "$message",
    description: "Returns the message contents.",
    returns: ArgType.String,
    nullable: true,
    execute: async function () {
        return this.success(this.data.args.join(" "));
    },
});
