import { Method } from "./Method";

export type IsMethod<T> = T extends Method<any[], any> ? true : false;
