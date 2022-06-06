import {
    Interaction,
    InteractionReplyOptions,
    MessageOptions,
    TextChannel,
    UnsafeModalBuilder,
} from "discord.js";
import { noop } from "../helpers";
import { ReplyTypes } from "../typings";

export class Container {
    data = Container.DefaultOptions;

    modal = new UnsafeModalBuilder();
    replyType: ReplyTypes = "send";

    mainChannel?: unknown;

    constructor(mainChannel?: unknown) {
        this.mainChannel = mainChannel;
    }

    setChannel(channel: unknown) {
        this.mainChannel = channel;
        return this;
    }

    async send<T>(content?: string, channel?: unknown): Promise<T | null> {
        if (channel) this.mainChannel = channel;

        if (content !== undefined) this.data.content = content;

        const receipt = this.mainChannel!;

        if (receipt === undefined) {
            return null;
        }

        let value: T | null = null;

        if (receipt instanceof Interaction) {
            if (receipt.isRepliable()) {
                if (receipt.replied) {
                    this.replyType = "followUp";
                } else if (receipt.deferred) {
                    this.replyType = "editReply";
                } else if (!(this.replyType in receipt)) {
                    this.replyType = "reply";
                }

                if (this.replyType === "showModal") {
                    value = (await receipt
                        .showModal(this.modal)
                        .catch(noop)) as unknown as T;
                } else {
                    value = (await receipt[this.replyType as "reply"](
                        this.data
                    ).catch(noop)) as unknown as T;
                }
            }
        }
        // We can reply to any object that has the send method.
        else if (this.replyType in (receipt as object)) {
            value = (await (receipt as TextChannel)
                .send(this.data)
                .catch(noop)) as unknown as T;
        }

        this.reset();

        return value ?? null;
    }

    static get DefaultOptions(): MessageOptions & InteractionReplyOptions {
        return {
            files: new Array(),
            ephemeral: false,
            embeds: new Array(),
            content: null,
        };
    }

    reset() {
        this.replyType = "send";
        this.modal = new UnsafeModalBuilder();
        this.data = Container.DefaultOptions;
    }
}
