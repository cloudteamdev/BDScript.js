import { Bot } from "../core";
import { EventTypes } from "../typings";
export declare class EventManager extends Array<EventTypes> {
    #private;
    bot: Bot;
    constructor(bot: Bot);
    add(...events: EventTypes[] | EventTypes[][]): this;
}
//# sourceMappingURL=EventManager.d.ts.map