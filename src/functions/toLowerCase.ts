import { ParserFunction, Return } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$toLowerCase",
    description: "Returns the provided text as lowercase.",
    returns: ArgType.String,
    args: [
        {
            name: "text",
            description: "The text to convert.",
            optional: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        const text = d.fieldAt(0).value ?? "";
        return Return.success(text.toLowerCase());
    },
});
