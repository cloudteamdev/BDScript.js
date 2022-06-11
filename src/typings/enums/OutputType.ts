/**
 * The output type, primarily used for the interpreter.
 *
 * As used in StatusManager:
 * ```ts
 * await Interpreter.run({
 *      args: [],
 *      ctx: {},
 *      bot: this.bot,
 *      executor: data.executor,
 *      functions: data.functions,
 *      output: OutputType.Code, //Using the OutputType enum.
 * });
 * ```
 */
export enum OutputType {
    None,
    Container,
    Code,
}
