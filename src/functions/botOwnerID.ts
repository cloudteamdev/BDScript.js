import { User } from "discord.js";
import { ParserFunction } from "../structures";
import { ArgType } from "../typings";

export default ParserFunction.create({
    name: "$botOwnerID",
    description: "Returns the bot's owner(s) ID(s).",
    returns: ArgType.User,
    nullable: true,
    execute: async function () {
        const { owner } = await this.client.application.fetch();

        if (owner instanceof User) return this.success(owner.id);

        return this.success(owner!.members.map((o) => o.id).join(", "));
    },
});
