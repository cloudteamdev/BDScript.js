import { Role } from "discord.js";
import { PropertyHolder } from "../typings";

export function createRolePropertyHolder<O>(obj: PropertyHolder<Role, O>) {
    return obj;
}
