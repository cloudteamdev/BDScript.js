import { EnumLike, GetEnum } from "../../typings";

/**
 * The base for errors.
 */
export class BaseError<Enum extends EnumLike<any>> extends Error {
    constructor(type: GetEnum<Enum>, ...params: unknown[]) {
        super(BaseError.makeMessage(type as string, params));
    }

    /**
     * Replaces `$x` with the given parameters.
     * @param msg The string to form.
     * @param params The params to replace.
     */
    private static makeMessage(msg: string, params: unknown[]): string {
        params.forEach(
            (x, y) => void (msg = msg.replaceAll(`$${y + 1}`, `${x}`))
        );
        return ":x: " + msg;
    }
}
