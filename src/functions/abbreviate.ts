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
        {
            name: "grouping",
            description: "whether to group numbers.",
            optional: true,
            type: ArgType.Boolean,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([num, grouping]) => {
            const formatted = Intl.NumberFormat("en-US", {
                notation: "compact",
                useGrouping: grouping ?? false,
            }).format(num);

            return this.success(formatted.toLowerCase());
        });
    },
});
