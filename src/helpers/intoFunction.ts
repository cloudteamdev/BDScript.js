import { Method } from "../typings";

export function intoFunction(
    str: string,
    or: string[] = []
): Method<[values: unknown[]], string> {
    str = str.replace(/`/g, "\\`");
    const matches = str.match(/SYSTEM_FUNCTION\((\d+)\)/g) ?? [];
    for (let i = 0, len = matches.length; i < len; i++) {
        const has = or[i];
        str = str.replace(
            matches[i],
            "${args[" + i + "] ?? " + `'${has ?? ""}'` + "}"
        );
    }
    return new Function("args", `return \`${str}\``) as ReturnType<
        typeof intoFunction
    >;
}
