import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$length",
    description: "Returns the length of a string.",
    returns: ArgType.Number,
    args: [
        {
            name: "string",
            description: "The string to get the length of.",
            optional: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([str]) => {
            return this.success(str.length);
        });
    },
});
