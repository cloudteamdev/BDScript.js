import { BaseCommandData } from "../interfaces";

export type TryOmitType<T extends boolean, Props extends PropertyKey, Base> = T extends true ? Omit<Base, Props> : BaseCommandData