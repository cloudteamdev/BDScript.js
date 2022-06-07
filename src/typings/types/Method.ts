export type Method<Args extends any[] = [], ReturnType = void> = (
    ...args: Args
) => ReturnType;
