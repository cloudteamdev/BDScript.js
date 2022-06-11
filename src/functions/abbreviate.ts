import { ParserFunction, Return } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$abbreviate",
    description: "Abbreviates a number.",
    returns: ArgType.String,
    args: [
        {
            name: "number",
            description: "The number to abbreviate.",
            optional: false,
            type: ArgType.Number,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([num]) => {
            const formatted = Intl.NumberFormat("en-US", {
                useGrouping: false,
            }).format(num);

            return Return.success(formatted.toLowerCase());
        });
    },
});
