export function isEmptyOrUndefined(value: unknown) {
    return (
        value === undefined || (typeof value === "string" && value.length === 0)
    );
}
