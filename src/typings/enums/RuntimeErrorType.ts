/**
 * Possible runtime error types and their corresponding messages.
 */
export enum RuntimeErrorType {
    Type = "Value given for argument '$1' is not of type **$2** in `$3`.",
    Required = "Argument '$1' is **required** in `$2`.",
    Custom = "$1",
    InvalidChoice = "Value given for argument '$1' does not match any of the choices in `$2`",
    Enum = "Value given for argument '$1' does not match any of the enum choices in `$2`",
    NumberRange = "Argument '$1' expects a **$2** between $3 in `$4`.",
    StringRange = "Argument '$1' expects a **$2** with a length between $3 in `$4`.",
    InvalidProperty = "Argument '$1' provided for '$2' is not a valid property in `$3`.",
}
