import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$username",
    description: "Returns a user's username.",
    returns: ArgType.String,
    args: [
        {
            name: "user",
            description: "The user to get the username.",
            optional: true,
            type: ArgType.User,
        },
    ],
    brackets: true,
    nullable: true,
    execute: async function (d) {
        return this.manage(await d.resolveArray(this), ([user]) => {
            return this.success(user?.username ?? this.user?.username);
        });
    },
});
