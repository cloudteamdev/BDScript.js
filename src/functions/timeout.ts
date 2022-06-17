import { ParserFunction } from "../structures";
import { ArgType, RuntimeErrorType } from "../typings";

export default ParserFunction.create({
    name: "$timeout",
    description: "Timeouts a user.",
    returns: ArgType.String,
    args: [
        {
            name: "guildID",
            description: "The ID of the guild to timeout the user in.",
            type: ArgType.Guild,
            optional: false,
        },
        {
            name: "userID",
            description: "The ID of the user to timeout.",
            type: ArgType.Member,
            pointer: 0,
            optional: false,
        },
        {
            name: "duration",
            description: "The amount of time to timeout the user for.",
            type: ArgType.Number, //TODO: Make duration type.
            optional: false,
        },
        {
            name: "reason",
            description: "The reason for the timeout.",
            type: ArgType.String,
            optional: true,
        },
    ],
    nullable: false,
    brackets: true,
    execute: async function (d) {
        return this.manage(
            await d.resolveArray(this),
            ([guild, member, duration, reason]) => {
                return member
                    .timeout(duration, reason)
                    .then(() => this.success(""))
                    .catch((err) =>
                        this.createRuntimeError(RuntimeErrorType.FailedAction, [
                            "timeout",
                            member.id,
                            d.betaImage([
                                guild.id,
                                member.user.id,
                                duration.toString(),
                            ]),
                            err,
                        ])
                    );
            }
        );
    },
});
