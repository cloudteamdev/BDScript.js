import { ParserFunction } from "../../structures";
import { ArgData } from "./ArgData";
import { FieldData } from "./FieldData";

export interface ProcessedCompiledFunctionData {
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
    fields: FieldData<ParserFunction<ArgData[]>>[];

    /**
     * The function id.
     */
    id: string;
}
