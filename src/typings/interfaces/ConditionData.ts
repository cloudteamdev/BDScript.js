import { OperatorTypes } from "../types";
import { FieldData } from "./FieldData";

export interface ConditionData {
    op: OperatorTypes;
    left: Omit<FieldData, "condition">;
    right: Omit<FieldData, "condition">;
}
