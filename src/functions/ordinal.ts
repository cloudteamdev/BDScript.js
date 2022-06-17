import { ordinal } from "../helpers";
import { ParserFunction } from "../structures";
import { ArgType, RuntimeErrorType } from "../typings";

export default ParserFunction.create({
    name: "$ordinal",
    description: "Adds st, nd, rd, or th to the end of an number.",
    returns: ArgType.Number,
    args: [
        {
            name: "number",
            description: "The number to ordinal.",
            optional: false,
            type: ArgType.Number,
        },
    ],

    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([num]) => {
            if (num % 1 !== 0)
                return this.createRuntimeError(RuntimeErrorType.Custom, [
                    `Provided 'number' in \`${d.betaImage([
                        num,
                    ])}\` is not an integer.`,
                ]);

            return this.success(num + ordinal(num));
        });
    },
});
