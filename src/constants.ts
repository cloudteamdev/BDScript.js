import { Role as GuildRole } from "discord.js";
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

export const Role: PropertyHolder<GuildRole, string | number | boolean> = {
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
        code: (r) => r.hoist + "",
    },
    icon: {
        description: "The icon URL of the role.",
        code: (r) =>
            r.iconURL({ size: 2048, extension: "png", forceStatic: false }) ??
            "",
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
};
