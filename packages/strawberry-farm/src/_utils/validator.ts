import AsyncValidator from 'async-validator';
import type {
  RuleItem,
  RuleType,
  Rule,
  ValidateOption,
  Value,
  ValidateError,
} from 'async-validator';

/**
 * AsyncValidationError is not exported by async-validator
 *
 * thus we override the original
 *
 * @see https://github.com/yiminghe/async-validator/blob/cc126d62084bfce8b0a84dff652348d5ec72d03f/src/util.ts#L173-L185
 */
export class AsyncValidationError extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;

  constructor(errors: ValidateError[], fields: Record<string, ValidateError[]>) {
    super('Async Validation Error');
    this.errors = errors;
    this.fields = fields;
  }
}

export const validator = {
  async validate(name: string, value: any, rules: IRuleItem | IRuleItem[] = []): Promise<void> {
    await new AsyncValidator({
      [name]: (Array.isArray(rules) ? rules : [rules]).map(
        ({ validator, asyncValidator, ...r }) => {
          const a: RuleItem = {
            ...r,
            validator: validator
              ? (_, v) => {
                  const ans = validator(v);
                  if (typeof ans === 'string') {
                    return new Error(ans);
                  }
                  return [];
                }
              : undefined,
            asyncValidator: asyncValidator
              ? async (_, v) => {
                  const r = await asyncValidator(v);
                  if (typeof r === 'string') {
                    throw new Error(r);
                  }
                }
              : undefined,
          };

          // NOTE: If validator/asyncValidator is undefined value, async-validator
          // will throw [field] is not a string if we input numbers.
          // This is a bug to us
          if (!a.validator) delete a.validator;
          if (!a.asyncValidator) delete a.asyncValidator;
          return a;
        }
      ),
    })
      .validate({ [name]: value }, { firstFields: true })
      .catch(e => {
        if (
          e instanceof Error &&
          (e as AsyncValidationError).message === 'Async Validation Error'
        ) {
          throw new AsyncValidationError(
            (e as AsyncValidationError).errors,
            (e as AsyncValidationError).fields
          );
        }
        console.error('[strawberry-farm]: Unexpected error during validation: ', e);
        throw e;
      });
  },
  isAsyncValidateError: (e: unknown): e is AsyncValidationError =>
    e instanceof AsyncValidationError,
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

AsyncValidator.warning = function () {};
