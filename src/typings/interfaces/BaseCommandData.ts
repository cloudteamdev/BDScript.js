import { CommandType } from "../enums"

export interface CommandDataWithType {
    type: CommandType
}

export interface BaseCommandData {
    code: string
    [key: PropertyKey]: unknown
}

export interface NamedCommandData extends BaseCommandData {
    name: string
}

export interface AliasesCommandData extends BaseCommandData {
    aliases?: string[]
}

export interface SkippablePrefixCommandData extends BaseCommandData {
    skipPrefix?: boolean
}