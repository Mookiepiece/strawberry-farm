import type { RuleType, Rule, ValidateOption, Value, ValidateError } from 'async-validator';
/**
 * AsyncValidationError is not exported by async-validator
 *
 * thus we override the original
 *
 * @see https://github.com/yiminghe/async-validator/blob/cc126d62084bfce8b0a84dff652348d5ec72d03f/src/util.ts#L173-L185
 */
export declare class AsyncValidationError extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
    constructor(errors: ValidateError[], fields: Record<string, ValidateError[]>);
}
export declare const validator: {
    validate(name: string, value: any, rules?: IRuleItem | IRuleItem[]): Promise<void>;
    isAsyncValidateError: (e: unknown) => e is AsyncValidationError;
};
export interface IRuleItem {
    type?: RuleType;
    required?: boolean;
    pattern?: RegExp | string;
    min?: number;
    max?: number;
    len?: number;
    enum?: Array<string | number | boolean | null | undefined>;
    whitespace?: boolean;
    fields?: Record<string, Rule>;
    options?: ValidateOption;
    defaultField?: Rule;
    transform?: (value: Value) => Value;
    message?: string | ((a?: string) => string);
    asyncValidator?: (value: Value) => void | Promise<string | void>;
    validator?: (value: Value) => string | void;
}
