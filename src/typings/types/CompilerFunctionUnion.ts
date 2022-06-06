import { CompilerFunctionData } from "../interfaces";

/**
 * Raw function data union
 */
 export type CompilerFunctionUnion = string[] | CompilerFunctionData[] | (string[] | CompilerFunctionData[])