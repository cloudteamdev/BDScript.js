export type ClassType<P = any> = new (...args: any[]) => P;
export type ClassInstance<T> = T extends ClassType<infer A> ? A : never;
