import { Role } from "discord.js";

export interface PropertyHolder<T, O> {
    [key: string]: {
        description: string;
        code: (v: T) => O;
    };
}
