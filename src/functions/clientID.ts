import { ParserFunction, Return } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$clientID",
    description: "Returns the client's ID.",
    returns: ArgType.String,
    nullable: true,
    execute: async function () {
        return Return.success(this.client.user.id);
    },
});
