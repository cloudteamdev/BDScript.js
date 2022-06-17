/**
 * Possible runtime error types and their corresponding messages.
 */
export enum RuntimeErrorType {
    /**
     * The provided argument was not of the expected type.
     * - `$1` = The name of the argument.
     * - `$2` = The expected type.
     * - `$3` = The function usage/image.
     */
    Type = "Value given for argument '$1' is not of type **$2** in `$3`.",
    /**
     * The provided argument is required but was omitted.
     * - `$1` = The name of the argument.
     * - `$2` = The function usage/image.
     */
    Required = "Argument '$1' is **required** in `$2`.",
    /**
     * A custom error.
     * - `$1` - The error.
     */
    Custom = "$1",
    /**
     * Invalid string choice.
     * - `$1` - The argument name.
     * - `$2` - The function usage/image.
     */
    InvalidChoice = "Value given for argument '$1' does not match any of the choices in `$2`",
    /**
     * The argument provided is not a valid enum choice.
     * - `$1` - The argument name.
     * - `$2` - The function usage/image.
     */
    Enum = "Value given for argument '$1' does not match any of the enum choices in `$2`",
    /**
     * The argument provided is not within the range specified.
     * - `$1` - The argument name.
     * - `$2` - The argument type.
     * - `$3` - The expected range.
     * - `$4` - The function usage/image.
     */
    NumberRange = "Argument '$1' expects a **$2** between $3 in `$4`.",
    /**
     * The argument provided is not within the specified length range.
     * - `$1` - The argument name.
     * - `$2` - The argument type.
     * - `$3` - The expected range.
     * - `$4` - The function usage/image.
     */
    StringRange = "Argument '$1' expects a **$2** with a length between $3 in `$4`.",
    /**
     * The argument provided is not a valid property.
     * - `$1` - The argument value.
     * - `$2` - The argument name.
     * - `$3` - The function usage/image
     */
    InvalidProperty = "Argument '$1' provided for '$2' is not a valid property in `$3`.",
    /**
     * Failed to perform an action, used for `catch` blocks or on promises.
     * - `$1` - What did it fail to do?
     * - `$2` - The snowflake that the action was being preformed on.
     * - `$3` - The function usage/image.
     * - `$4` - The error that was caught.
     */
    FailedAction = "Failed to $1 '$2' for `$3`.\n```\n$4```",
    /**
     * The argument was of type channel as expected, but it isn't a text-based channel.
     * - `$1` - The argument name.
     * - `$2` - The function usage/image.
     */
    TextBasedOnly = "Argument `$1`'s pointer in `$2` is not a text-based channel.",
}
