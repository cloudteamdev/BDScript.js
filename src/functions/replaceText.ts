import { ParserFunction, Return } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$replaceText",
    description: "Replace 'sample' with 'replacement' in 'text'.",
    returns: ArgType.String,
    args: [
        {
            name: "text",
            description: "The text to replace from.",
            optional: false,
            type: ArgType.String,
        },
        {
            name: "sample",
            description: "The text to replace in text.",
            optional: false,
            type: ArgType.String,
        },
        {
            name: "replacement",
            description: "The text to replace with.",
            optional: false,
            type: ArgType.String,
        },
        {
            name: "amountToReplace",
            description: "The amount of times to replace the sample.",
            type: ArgType.Number,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(
            await d.resolveArray(this),
            ([text, sample, replacement, amountToReplace]) => {
                let amount = amountToReplace ?? -1;

                if (amount === -1)
                    return this.success(text.replaceAll(sample, replacement));

                if (amount < 1) return this.success(text);

                while (amount--) {
                    text = text.replace(sample, replacement);
                }

                return this.success(text);
            }
        );
    },
});
