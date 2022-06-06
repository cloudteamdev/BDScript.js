import { BaseCommandData } from "../interfaces";
export declare type TryOmitType<T extends boolean, Props extends PropertyKey, Base> = T extends true ? Omit<Base, Props> : BaseCommandData;
//# sourceMappingURL=TryOmitType.d.ts.map