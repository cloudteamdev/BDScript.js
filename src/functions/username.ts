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
            type: ArgType.User,
            optional: false,
        },
    ],
    brackets: true,
    nullable: true,
    execute: async function (d) {
        if (!d.hasFields()) return this.success(this.user?.username);

        return this.manage(await d.resolveArray(this), ([user]) => {
            return this.success(user.username);
        });
    },
});
