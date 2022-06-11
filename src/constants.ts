/**
 * An array of possible comparison operators.
 */
export const Operators = [">=", "<=", ">", "<", "==", "!="] as const;

/**
 * The truthy booleans.
 * @remark Left without `as const`/explicit typing to allow for methods such as `Array.prototype.includes()` to work with arbitrary strings.
 */
export const Truthy = ["true", "yes"];

/**
 * The falsy booleans.
 * @remark Left without `as const`/explicit typing to allow for methods such as `Array.prototype.includes()` to work with arbitrary strings.
 */
export const Falsy = ["false", "no"];

/**
 * Both truthy and falsy booleans.
 * @remark Left without `as const`/explicit typing to allow for methods such as `Array.prototype.includes()` to work with arbitrary strings.
 */
export const Booleans = [...Truthy, ...Falsy];
