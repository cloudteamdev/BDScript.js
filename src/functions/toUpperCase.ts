import { ParserFunction, Return } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$toUpperCase",
    description: "Returns the provided text as uppercase.",
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
        return this.manage(await d.resolveArray(this), ([str]) =>
            this.success(str.toUpperCase())
        );
    },
});
