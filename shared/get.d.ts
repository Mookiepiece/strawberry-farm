export declare function set<T extends Record<string, unknown>>(obj: T, nameOrPath: string | string[], value: any): T;
export declare function unset<T extends Record<string, unknown>>(obj: T, nameOrPath: string | string[]): T;
export declare function get(obj: Record<string, any>, nameOrPath: string | string[]): any;
export declare function has(obj: Record<string, unknown>, nameOrPath: string | string[]): boolean;
