import { Role } from "../constants";
import { objectKeys } from "../helpers";
import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$role",
    description: "Returns a data about a role.",
    returns: ArgType.String,
    args: [
        {
            name: "guildID",
            description: "the guild to get the info of the role",
            type: ArgType.Guild,
            optional: false,
        },
        {
            name: "roleID",
            description: "The role to get data about.",
            type: ArgType.Role,
            pointer: 0,
            optional: false,
        },
        {
            name: "property",
            description: "The property to get.",
            type: ArgType.String,
            choices: objectKeys(Role),
            optional: false,
        },
    ],
    brackets: true,
    nullable: true,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([, role, prop]) => {
            const option = Role[prop];

            return this.success(option.code(role));
        });
    },
});
