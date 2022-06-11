import { ParserFunction, Return } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$ping",
    description: "Returns the bot's websocket ping.",
    returns: ArgType.Number,
    nullable: true,
    execute: async function () {
        return this.success(this.client.ws.ping);
    },
});
