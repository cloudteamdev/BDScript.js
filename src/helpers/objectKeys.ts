/**
 * Same as `Object.keys()` but it's typed.
 * @param obj The object to get the keys of.
 */
export function objectKeys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
}
