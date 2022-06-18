import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$floor",
    description:
        "Rounds a number to the nearest integer less than or equal to the given number.",
    returns: ArgType.Number,
    args: [
        {
            name: "number",
            description: "The number to floor.",
            optional: false,
            type: ArgType.Number,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([num]) =>
            this.success(Math.floor(num))
        );
    },
});
