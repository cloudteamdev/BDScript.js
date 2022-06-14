import { Compiler } from "../core";
import { intoFunction } from "../helpers";
import FunctionManager from "../managers/FunctionManager";
import { Interpreter, ParserFunction } from "../structures";
import { ArgType, OutputType, RuntimeErrorType } from "../typings";

export default ParserFunction.create({
    name: "$eval",
    description: "Evals BDScript code.",
    returns: ArgType.String,
    args: [
        {
            name: "code",
            description: "The code to eval.",
            optional: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    nullable: false,
    execute: async function (d) {
        const code = await d.resolveAll(this);

        if (!code.isSuccess()) return code;

        let compiler: Compiler<any>;

        try {
            compiler = FunctionManager.compile(code.value as string);
        } catch (error: any) {
            return this.createRuntimeError(RuntimeErrorType.Custom, [
                error.stack,
            ]);
        }

        const executor = intoFunction(compiler.getCompiledCode());
        const functions = compiler.getFunctions();

        const result = await Interpreter.run({
            args: [],
            ctx: this.data.ctx,
            bot: this.bot,
            executor,
            doNotSend: true,
            functions,
            output: OutputType.Code,
        });

        if (result === null) return this.error(null);

        return this.success(result);
    },
});
