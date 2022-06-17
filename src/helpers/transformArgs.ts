import { ParserFunction } from "../structures";
import { ArgData, ArgType, DecideArgType } from "../typings";

export function transformArgs(
    fn: ParserFunction<ArgData[]>,
    args: DecideArgType[]
): string[] {
    if (!fn.data.args?.length) return [];

    const arr = new Array<string>(args.length);

    for (let i = 0, len = fn.data.args.length; i < len; i++) {
        const value = args[i];
        const arg = fn.data.args[i];

        switch (arg.type) {
            case ArgType.String: {
                arr[i] = value;
                break;
            }

            case ArgType.Boolean: {
                arr[i] = value.toString();
                break;
            }

            case ArgType.Enum: {
                arr[i] = arg.enum![value];
                break;
            }

            case ArgType.Number: {
                arr[i] = value.toString();
                break;
            }

            case ArgType.User:
            case ArgType.Role:
            case ArgType.Channel:
            case ArgType.GuildChannel:
            case ArgType.Message:
            case ArgType.Guild: {
                arr[i] = value.id;
                break;
            }

            default: {
                throw new Error(
                    `Unexpected arg type ${
                        ArgType[arg.type]
                    }, please handle it accordingly.`
                );
            }
        }

        arr[i] ??= value;
    }

    return arr;
}
