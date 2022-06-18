import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$setDescription",
    description: "Sets the description of the embeds.",
    returns: ArgType.String,
    args: [
        {
            name: "text",
            description: "The description of the embed.",
            optional: false,
            type: ArgType.String,
        },
        {
            name: "embedIndex",
            description: "The index of the embed to set the description of.",
            optional: true,
            type: ArgType.Number,
            min: 1,
            max: 10,
            default: () => 1,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([desc, index]) => {
            this.data.container.embedAt(index - 1).setDescription(desc);

            return this.success("");
        });
    },
});
