import { Message } from "../constants";
import { objectKeys } from "../helpers";
import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$msg",
    description: "Returns a data about a message.",
    returns: ArgType.String,
    args: [
        {
            name: "channelID",
            description: "The channel to get the info of the message.",
            type: ArgType.Channel,
            optional: false,
        },
        {
            name: "messageID",
            description: "The message to get data about.",
            type: ArgType.Message,
            pointer: 0,
            optional: false,
        },
        {
            name: "property",
            description: "The property to get.",
            type: ArgType.String,
            choices: objectKeys(Message),
            optional: false,
        },
    ],
    brackets: true,
    nullable: true,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([, msg, prop]) => {
            const option = Message[prop];

            return this.success(option.code(msg));
        });
    },
});
