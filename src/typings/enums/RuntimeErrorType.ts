export enum RuntimeErrorType {
    Type = "Value given for argument '$1' is not of type **$2** in `$3`.",
    Required = "Argument '$1' is **required** in `$2`.",
    Custom = "$1",
    NumberRange = "Argument '$1' expects a **$2** between $3 in `$4`.",
    StringRange = "Argument '$1' expects a **$2** with a length between $3 in `$4`.",
}