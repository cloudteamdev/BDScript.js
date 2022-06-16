/**
 * Returns whether an object has the specified property, specifically if the type of the object is unknown.
 * @param obj The object to check.
 * @param name The name of the property to check.
 * @returns Whether the object has the specified property.
 */
export function hasProperty<P extends string>(
    obj: any,
    name: P
): obj is {} & { [T in keyof typeof obj as `${P}`]: unknown } {
    return obj[name] !== undefined;
}
