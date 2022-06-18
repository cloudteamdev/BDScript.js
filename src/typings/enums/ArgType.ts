/**
 * Possible types of arguments.
 */
export enum ArgType {
    /**
     * Value should be a string.
     */
    String,
    /**
     * Value should be number.
     */
    Number,
    /**
     * Value should be a boolean.
     */
    Boolean,
    /**
     * Value should be a guild.
     */
    Guild,
    /**
     * Value should be a user.
     */
    User,
    /**
     * Value should be a role.
     */
    Role,
    /**
     * Value should be a channel.
     */
    Channel,
    /**
     * Value should be a guild channel.
     */
    GuildChannel,
    /**
     * Value should be a message.
     */
    Message,
    /**
     * Value should be a member.
     */
    Member,
    /**
     * Value should be a sticker.
     */
    Sticker,
    /**
     * Value should be an enum option.
     */
    Enum,
}
