import { CommandDataWithType } from "../interfaces";
import { MessageCommand } from "../types";

export type AnyCommandData = MessageCommand & CommandDataWithType;
