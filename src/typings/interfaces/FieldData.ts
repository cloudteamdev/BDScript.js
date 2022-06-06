import { intoFunction } from "../../internal functions"
import { ConditionData } from "./ConditionData"
import { CompiledFunctionData } from "./CompiledFunctionData"
import { ParserFunction } from "../../structures"
import { ArgData } from "./ArgData"

/**
 * Represents a function's field.
 */
export interface FieldData<T extends CompiledFunctionData | ParserFunction<ArgData[]> = CompiledFunctionData | ParserFunction<ArgData[]>> {
    /**
     * The value of the field.
     */
    value: string

    /**
     * The functions used in this field.
     */
    overloads: T[]

    /**
     * The condition of this field, needs to be checked and cached at runtime.
     */
    condition?: ConditionData

    /**
     * The executor function
     */
    executor: ReturnType<typeof intoFunction> | null 
}