import { Role as GuildRole } from "discord.js";
import {
    createMessagePropertyHolder,
    createRolePropertyHolder,
} from "./helpers";
import { PropertyHolder } from "./typings";

/**
 * An array of possible comparison operators.
 */
export const Operators = [">=", "<=", ">", "<", "==", "!="] as const;

/**
 * The truthy booleans.
 * @remark Left without `as const`/explicit typing to allow for methods such as `Array.prototype.includes()` to work with arbitrary strings.
 */
export const Truthy = ["true", "yes"];

/**
 * The falsy booleans.
 * @remark Left without `as const`/explicit typing to allow for methods such as `Array.prototype.includes()` to work with arbitrary strings.
 */
export const Falsy = ["false", "no"];

/**
 * Both truthy and falsy booleans.
 * @remark Left without `as const`/explicit typing to allow for methods such as `Array.prototype.includes()` to work with arbitrary strings.
 */
export const Booleans = [...Truthy, ...Falsy];

export const Role = createRolePropertyHolder({
    name: {
        description: "The name of the role.",
        code: (r) => r.name,
    },
    color: {
        description: "The color of the role.",
        code: (r) => r.hexColor,
    },
    hoist: {
        description: "Whether the role is hoisted.",
        code: (r) => r.hoist.toString(),
    },
    icon: {
        description: "The icon URL of the role.",
        code: (r) =>
            r.iconURL({ size: 2048, extension: "png", forceStatic: false }),
    },
    id: {
        description: "The ID of the role.",
        code: (r) => r.id,
    },
    members: {
        description: "A list of members with this role.",
        code: (r) => r.members.map((user) => user.id).join(", "),
    },
    memberCount: {
        description: "The number of members with this role.",
        code: (r) => r.members.size,
    },
    mentionable: {
        description: "Whether the role is mentionable.",
        code: (r) => r.mentionable,
    },
    permissions: {
        description: "The permissions of the role.",
        code: (r) => r.permissions.toArray().join(", "),
    },
    guild: {
        description: "The guild the role is in.",
        code: (r) => r.guild.id,
    },
    editable: {
        description: "Whether the role is editable.",
        code: (r) => r.editable,
    },
    position: {
        description: "The position of the role.",
        code: (r) => r.position,
    },
    managed: {
        description:
            "Whether the role is managed by Discord or an integration.",
        code: (r) => r.managed,
    },
    createdTimestamp: {
        description: "The timestamp of when the role was created.",
        code: (r) => r.createdTimestamp,
    },
});

export const Message = createMessagePropertyHolder({
    id: {
        description: "The ID of the message.",
        code: (m) => m.id,
    },
    applicationID: {
        description: "The ID of the application that sent the message, if any.",
        code: (m) => m.applicationId,
    },
    content: {
        description: "The content of the message.",
        code: (m) => m.content,
    },
    author: {
        description: "The author ID of the message.",
        code: (m) => m.author.id,
    },
    channel: {
        description: "The channel ID of the message.",
        code: (m) => m.channel.id,
    },
    guild: {
        description: "The guild ID of the message.",
        code: (m) => m.guild?.id ?? "",
    },
    crosspostable: {
        description: "Whether the message is crosspostable.",
        code: (m) => m.crosspostable,
    },
    deletable: {
        description: "Whether the message is deletable.",
        code: (m) => m.deletable,
    },
    editable: {
        description: "Whether the message is editable.",
        code: (m) => m.editable,
    },
    editedTimestamp: {
        description: "The timestamp of when the message was last edited.",
        code: (m) => m.editedTimestamp,
    },
    createdTimestamp: {
        description: "The timestamp of when the message was created.",
        code: (m) => m.createdTimestamp,
    },
    hasThread: {
        description: "Whether the message has a thread.",
        code: (m) => m.hasThread,
    },
    flags: {
        description: "The flags of the message.",
        code: (m) => m.flags.toArray().join(", "),
    },
    inGuild: {
        description: "Whether the message is in a guild.",
        code: (m) => m.inGuild(),
    },
    attachments: {
        description: "A list of attachment IDs on the message.",
        code: (m) => m.attachments.map((a) => a.id).join(", "),
    },
    embedCount: {
        description: "The number of embeds on the message.",
        code: (m) => m.embeds.length,
    },
    pinnable: {
        description: "Whether the message is pinnable.",
        code: (m) => m.pinnable,
    },
    pinned: {
        description: "Whether the message is pinned.",
        code: (m) => m.pinned,
    },
    stickers: {
        description: "A list of sticker IDs on the message.",
        code: (m) => m.stickers.map((s) => s.id).join(", "),
    },
    tts: {
        description: "Whether the message is TTS.",
        code: (m) => m.tts,
    },
    type: {
        description: "The type of the message.",
        code: (m) => m.type,
    },
    url: {
        description: "The URL of the message.",
        code: (m) => m.url,
    },
    webhookID: {
        description: "The ID of the webhook that sent the message, if any.",
        code: (m) => m.webhookId ?? "",
    },
});
