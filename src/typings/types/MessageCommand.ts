import {
    BaseCommandData,
    SkippablePrefixCommandData,
    NamedCommandData,
    AliasesCommandData,
} from "../interfaces/BaseCommandData";

export type MessageCommand = BaseCommandData &
    AliasesCommandData &
    SkippablePrefixCommandData &
    NamedCommandData;
