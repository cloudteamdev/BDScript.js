import { Nullable } from "./Nullable";

export type PropertyHolder<Instance, Object> = {
    [P in keyof Object]: {
        description: string;
        code: (bind: Instance) => Nullable<string | boolean | number>;
    };
};
