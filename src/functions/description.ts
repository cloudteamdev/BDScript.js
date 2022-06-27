import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$description",
    description: "Sets the description of the embeds.",
    returns: ArgType.String,
    args: [
        {
            name: "embedIndex",
            description: "The index of the embed to set the description of.",
            type: ArgType.Number,
            min: 1,
            optional: false,
            max: 10,
        },
        {
            name: "text",
            description: "The description of the embed.",
            optional: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([index, desc]) => {
            this.data.container.embedAt(index - 1).setDescription(desc);
            return this.success("");
        });
    },
});
