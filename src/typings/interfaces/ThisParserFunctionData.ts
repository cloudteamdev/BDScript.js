import { Bot } from "../../core"
import { intoFunction } from "../../internal functions"
import { type ParserFunction } from "../../structures"
import { Container } from "../../structures/Container"
import { OutputType } from "../enums"
import { ArgData } from "./ArgData"

export interface ThisParserFunctionData<Ctx = unknown, Out extends OutputType = OutputType> {
    ctx: Ctx
    args: string[]
    bot: Bot
    container: Container
    command?: unknown
    executor: ReturnType<typeof intoFunction>
    functions: ParserFunction<ArgData[]>[]
    output?: Out 
}