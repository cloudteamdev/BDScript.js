import { Message, Role } from "discord.js";
import { PropertyHolder } from "../typings";

export function createRolePropertyHolder<O>(obj: PropertyHolder<Role, O>) {
    return obj;
}

export function createMessagePropertyHolder<O>(
    obj: PropertyHolder<Message, O>
) {
    return obj;
}
