"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
class EventManager extends Array {
    bot;
    constructor(bot) {
        super();
        this.bot = bot;
    }
    add(...events) {
        for (let i = 0, len = events.length; i < len; i++) {
            const ev = events[i];
            if (Array.isArray(ev)) {
                this.add(ev);
            }
            else {
                this.#import(ev)
                    .then(fn => {
                    this.bot.client.on(fn[0], fn[1].bind(this.bot));
                })
                    .catch(() => {
                    throw new Error(`Event ${ev} does not exist.`);
                });
            }
        }
        return this;
    }
    #import(eventName) {
        return Promise.resolve().then(() => __importStar(require(`../events/${eventName}`))).then(c => c.default);
    }
}
exports.EventManager = EventManager;
//# sourceMappingURL=EventManager.js.map