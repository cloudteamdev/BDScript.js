import { ThisParserFunction } from "../../structures";
import { ArgType } from "../enums";
import { DecideArgType } from "../types";
export interface ArgData<Type extends ArgType = ArgType, Optional extends boolean = boolean> {
    name: string;
    optional?: Optional;
    type: Type;
    description: string;
    pointer?: number;
    default?: (value: ThisParserFunction) => Promise<DecideArgType<Type, Optional>>;
}
//# sourceMappingURL=ArgData.d.ts.map