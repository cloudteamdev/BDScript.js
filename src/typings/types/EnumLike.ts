export type EnumLike<T> = {
    [id: string]: T | string;
    [nu: number]: string;
};
