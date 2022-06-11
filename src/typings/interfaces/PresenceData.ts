import type { ActivityType, PresenceStatusData } from "discord.js";
import { intoFunction } from "../../helpers";
import { ParserFunction } from "../../structures";
import { ArgData } from "./ArgData";

export interface PresenceData {
    name?: string;
    status: PresenceStatusData;
    type?: Exclude<ActivityType, ActivityType.Custom>;
    url?: string;
}

export interface StatusData extends PresenceData {
    functions?: ParserFunction<ArgData[]>[];
    executor?: ReturnType<typeof intoFunction>;
}
