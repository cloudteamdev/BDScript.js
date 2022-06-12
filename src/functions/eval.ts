import { intoFunction } from "../helpers";
import FunctionManager from "../managers/FunctionManager";
import { Interpreter, ParserFunction } from "../structures";
import { ArgType, OutputType } from "../typings";

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
        const code = await this.manage(await d.resolveArray(this), ([c]) =>
            this.success(c)
        );

        const compiled = FunctionManager.compile(code.value);

        const executor = intoFunction(compiled.getCompiledCode());
        const functions = compiled.getFunctions();

        const result = await Interpreter.run({
            args: [],
            ctx: this.mainChannel,
            bot: this.bot,
            executor,
            functions,
            output: OutputType.Code,
        });

        return this.success(result);
    },
});
