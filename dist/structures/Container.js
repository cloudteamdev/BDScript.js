"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const discord_js_1 = require("discord.js");
const internal_functions_1 = require("../internal functions");
class Container {
    data = Container.DefaultOptions;
    modal = new discord_js_1.UnsafeModalBuilder();
    replyType = "send";
    mainChannel;
    constructor(mainChannel) {
        this.mainChannel = mainChannel;
    }
    setChannel(channel) {
        this.mainChannel = channel;
        return this;
    }
    async send(content, channel) {
        if (channel)
            this.mainChannel = channel;
        if (content !== undefined)
            this.data.content = content;
        const receipt = this.mainChannel;
        if (receipt === undefined) {
            return null;
        }
        let value = null;
        if (receipt instanceof discord_js_1.Interaction) {
            if (receipt.isRepliable()) {
                if (receipt.replied) {
                    this.replyType = 'followUp';
                }
                else if (receipt.deferred) {
                    this.replyType = 'editReply';
                }
                else if (!(this.replyType in receipt)) {
                    this.replyType = 'reply';
                }
                if (this.replyType === 'showModal') {
                    value = await receipt.showModal(this.modal).catch(internal_functions_1.noop);
                }
                else {
                    value = await receipt[this.replyType](this.data).catch(internal_functions_1.noop);
                }
            }
        }
        // We can reply to any object that has the send method. 
        else if ((this.replyType in receipt)) {
            value = await receipt.send(this.data).catch(internal_functions_1.noop);
        }
        this.reset();
        return value ?? null;
    }
    static get DefaultOptions() {
        return {
            files: new Array(),
            ephemeral: false,
            embeds: new Array(),
            content: null
        };
    }
    reset() {
        this.replyType = 'send';
        this.modal = new discord_js_1.UnsafeModalBuilder();
        this.data = Container.DefaultOptions;
    }
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map