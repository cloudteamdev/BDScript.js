import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$authorID",
    description: "Returns the author's ID.",
    returns: ArgType.User,
    nullable: true,
    execute: async function () {
        return this.success(this.user?.id);
    },
});
