import { FieldData } from "./FieldData";
export interface CompiledFunctionData {
    /**
     * The name of the function.
     */
    name: string;
    /**
     * The data inside the function.
     */
    inside: null | string;
    /**
     * The fields of this function.
     */
    fields: FieldData<CompiledFunctionData>[];
    /**
     * The function id.
     */
    id: string;
}
//# sourceMappingURL=CompiledFunctionData.d.ts.map