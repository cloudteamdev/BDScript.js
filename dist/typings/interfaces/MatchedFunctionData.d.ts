/**
 * Represents matched functions by regex.
 */
export interface MatchedFunctionData {
    /**
     * The name of the function.
     */
    name: string;
    brackets: boolean | null;
    /**
     * The position of the function in the code.
     */
    position: number;
    /**
     * The size of the function.
     * @private
     */
    size: number;
}
//# sourceMappingURL=MatchedFunctionData.d.ts.map