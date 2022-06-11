export enum RuntimeErrorType {
    Type = "Given value '$1' is not of type **$2** in `$3`",
    Required = "Argument '$1' is **required** in `$2`",
    Custom = "$1",
    Range = "Argument '$1' expects a $2 of length between $3 in `$4`",
}
