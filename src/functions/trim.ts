import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$trim",
    description:
        "Removes excess whitespace from the start and end of a string.",
    returns: ArgType.String,
    args: [
        {
            name: "string",
            description: "The string to trim.",
            optional: false,
            type: ArgType.String,
        },
        {
            name: "method",
            description:
                "Specify 'start' or 'end' to trim the start or end of the string. If this argument is omitted, it does both.",
            optional: true,
            type: ArgType.String,
            options: ["start", "end"],
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([str, method]) => {
            return this.success(
                method === "start"
                    ? str.trimStart()
                    : method === "end"
                    ? str.trimEnd()
                    : str.trim()
            );
        });
    },
});
