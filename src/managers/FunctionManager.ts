import { readdirSync } from "fs"
import { iterate } from "../internal functions"
import { ParserFunction } from "../structures"
import { ArgData, CompilerFunctionData, FunctionData } from "../typings"
import { Compiler } from "../core/Compiler"

export default new class {
    readonly nativeFunctions: Map<string, FunctionData<ArgData[]>> = new Map()

    constructor() {
        this.init()
    }

    init() {
        const files = readdirSync(`${__dirname}/../functions`)
        for (let i = 0, len = files.length;i < len;i++) {
            const file = files[i]
            if (!file.endsWith('.js')) continue

            const fn: ParserFunction<ArgData[]> = require("../functions/" + file).default
            this.nativeFunctions.set(fn.data.name, fn.data)
        }
    }

    asRaw() {
        const arr = new Array<CompilerFunctionData>(this.nativeFunctions.size)

        let i = 0
        iterate(this.nativeFunctions.values(), (element) => {
            arr[i++] = {
                name: element.name,
                brackets: element.brackets,
                optional: !element.required
            }
        })
        return arr 
    }

    compile(...params: ConstructorParameters<typeof Compiler<any>>) {
        if (Compiler["FUNCTIONS"] === null) {
            Compiler.setFunctions(Array.from(this.nativeFunctions.values()))
        }

        return new Compiler(...params).start()
    }
} ()