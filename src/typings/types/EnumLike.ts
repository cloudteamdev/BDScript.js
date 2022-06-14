export type EnumLike<T = any> = {
    [id: string]: T | string;
    [nu: number]: string;
};
