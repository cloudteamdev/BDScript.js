import { ParserFunction, Return } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$round",
    description: "Rounds a number to the nearest integer.",
    returns: ArgType.Number,
    args: [
        {
            name: "number",
            description: "The number to round.",
            optional: false,
            type: ArgType.Number,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([num]) => {
            return Return.success(Math.round(num));
        });
    },
});
