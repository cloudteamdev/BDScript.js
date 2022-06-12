/**
 * Returns whether a empty or undefined value is passed.
 * @param value A value to check.
 */
export function isEmptyOrUndefined(value: unknown): boolean {
    return (
        value === undefined || (typeof value === "string" && value.length === 0)
    );
}
