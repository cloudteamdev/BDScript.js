import type { ActivityType, PresenceStatusData } from "discord.js";

export interface PresenceData {
    name?: string;
    status: PresenceStatusData;
    type?: Exclude<ActivityType, ActivityType.Custom>;
    url?: string;
}