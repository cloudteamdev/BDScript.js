import { ParserFunction, Return } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$ceil",
    description:
        "Rounds a number to the nearest integer greater than or equal to the given number.",
    returns: ArgType.Number,
    args: [
        {
            name: "number",
            description: "The number to ceil.",
            optional: false,
            type: ArgType.Number,
        },
    ],

    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([num]) => {
            return this.success(Math.ceil(num));
        });
    },
});
