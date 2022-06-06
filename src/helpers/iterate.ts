export function iterate<K, R>(
    iterable: IterableIterator<K>,
    fn: (el: K) => R
): R[] {
    let item: ReturnType<typeof iterable["next"]>;
    const arr = new Array<R>();

    while ((item = iterable.next())) {
        if (item.done) {
            break;
        }

        arr.push(fn(item.value));
    }

    return arr;
}
