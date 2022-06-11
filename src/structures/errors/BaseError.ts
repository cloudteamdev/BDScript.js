import { EnumLike, GetEnum } from "../../typings";

export class BaseError<Enum extends EnumLike<any>> extends Error {
    constructor(type: GetEnum<Enum>, ...params: unknown[]) {
        super(BaseError.makeMessage(type as string, params));
    }

    private static makeMessage(msg: string, params: unknown[]): string {
        params.forEach(
            (x, y) => void (msg = msg.replaceAll(`$${y + 1}`, `${x}`))
        );
        return ":x: " + msg;
    }
}
