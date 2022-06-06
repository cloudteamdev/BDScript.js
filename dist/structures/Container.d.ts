import { InteractionReplyOptions, MessageOptions, UnsafeModalBuilder } from "discord.js";
import { ReplyTypes } from "../typings";
export declare class Container {
    data: MessageOptions & InteractionReplyOptions;
    modal: UnsafeModalBuilder;
    replyType: ReplyTypes;
    mainChannel?: unknown;
    constructor(mainChannel?: unknown);
    setChannel(channel: unknown): this;
    send<T>(content?: string, channel?: unknown): Promise<T | null>;
    static get DefaultOptions(): MessageOptions & InteractionReplyOptions;
    reset(): void;
}
//# sourceMappingURL=Container.d.ts.map