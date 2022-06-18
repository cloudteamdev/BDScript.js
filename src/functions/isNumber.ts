import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$isNumber",
    description: "Returns whether or not the given value is a number.",
    returns: ArgType.Boolean,
    args: [
        {
            name: "value",
            description: "The value to check.",
            optional: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([val]) =>
            this.success(val.trim() === "" ? false : isFinite(val as any))
        );
    },
});
