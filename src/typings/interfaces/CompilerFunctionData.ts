/**
 * Data that can be passed to the compiler.
 */
export interface CompilerFunctionData {
    /**
     * The name of the function.
     */
    name: string;

    /**
     * Whether this function uses brackets.
     * @default true
     */
    brackets?: boolean;

    /**
     * Whether this function's brackets are optional.
     * @default true
     */
    optional?: boolean;
}
