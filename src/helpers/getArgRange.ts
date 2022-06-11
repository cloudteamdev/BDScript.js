import { ArgData } from "../typings";

export function getArgRange(arg: ArgData): string {
    return `${arg.min?.toLocaleString() ?? "any"}-${
        arg.max?.toLocaleString() ?? "any"
    }`;
}
