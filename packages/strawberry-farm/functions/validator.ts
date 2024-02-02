class ValidationError extends Error {}

const descriptor = {
  'Any Nullish Literal': 'required',
  'Any Nullish Literal2': ['any', 'required'],
  'String Nullish Literal': 'string',
  'String Literal': ['string', 'required'],
  'Ang Nullish': { any: true, required: true },
  'String Custom Message': { string: true, message: 'message' },
  'String Custom Message Short': { string: 'true' },
  'String Not Nullish': { string: true, required: true },
  'String Not Nullish2': [{ string: true }, { required: true }],
  'String Not Nullish Custom Message': { string: 'true', required: 'required' },
  'String Min': { string: [3] },
  'String Max': { string: [, 10] },
  'String Range': { string: [3, 10] },
  'String Range With Custom Message': [{ string: [3, 10], message: 'message' }],
  'String Individual Custom Message For Type And Range Not Supported': [
    { string: true, message: 'S' },
    { string: [3, 10], message: 'OOM' },
  ],
  //
  'Number Type': 'number',
  'Number Type Not Nullish': ['number', 'required'],
  'Number Min': { number: [3] },
  'Number Max': { number: [, 10] },
  'Number Range': { number: [3, 10] },
  //
  'Formats Email': { email: true },
  'Formats Email Literal': 'email',
  'Formats Email Literal Required': ['email', 'required'],
  //
  'Enum True': { enum: true },
  'Enum True2': { enum: [true] },
  'Enum True Custom Message': { enum: [true], message: 'message' },
  //
  'Never Enum': { enum: [] },
  'Never Empty': {},
  'Never Knot': [{ string: true }, { boolean: true }, { required: true }],
  'Never Knot2': ['string', 'boolean', 'required'],
  'Complex Knot': { string: true, boolean: true, enum: [1, 2, 3] },
};

const messags = {
  default: '校验此字段时失败： %s',
  required: '%s 是必填项',
  enum: '%s 必须是下列值的其中之一： %s',
  whitespace: '%s 不能为空',
  date: {
    format: '%s date %s is invalid for format %s',
    parse: '%s date could not be parsed, %s is invalid ',
    invalid: '%s date %s is invalid',
  },
  types: {
    string: '%s is not a %s',
    method: '%s is not a %s (function)',
    array: '%s is not an %s',
    object: '%s is not an %s',
    number: '%s is not a %s',
    date: '%s is not a %s',
    boolean: '%s is not a %s',
    integer: '%s is not an %s',
    float: '%s is not a %s',
    regexp: '%s is not a valid %s',
    email: '%s is not a valid %s',
    url: '%s is not a valid %s',
    hex: '%s is not a valid %s',
  },
  string: {
    len: '%s must be exactly %s characters',
    min: '%s must be at least %s characters',
    max: '%s cannot be longer than %s characters',
    range: '%s must be between %s and %s characters',
  },
  number: {
    len: '%s must equal %s',
    min: '%s cannot be less than %s',
    max: '%s cannot be greater than %s',
    range: '%s must be between %s and %s',
  },
  array: {
    len: '%s must be exactly %s in length',
    min: '%s cannot be less than %s in length',
    max: '%s cannot be greater than %s in length',
    range: '%s must be between %s and %s in length',
  },
  pattern: {
    mismatch: '%s value %s does not match pattern %s',
  },
} as const;

const formats = new Map(
  Object.entries({
    string: (value: unknown) => typeof value === 'string',
    number: (value: unknown) =>
      typeof value === 'number' &&
      Number.isFinite(value) &&
      !Number.isNaN(value),
    array: (value: unknown) => Array.isArray(value),
    object: (value: unknown) =>
      !!value && typeof value === 'object' && !Array.isArray(value),
    enum: true,
    date: (value: unknown) => !!value && value instanceof Date,
    /**
     * Used: https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
     * Candidate: https://github.com/ajv-validator/ajv-formats/blob/4dd65447575b35d0187c6b125383366969e6267e/src/formats.ts#L64
     * Candidate: https://emailregex.com/
     */
    email:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  }),
);

const configs = new Map(
  Object.entries({
    string: (
      value: string,
      config: number | (number | null | undefined)[] | RegExp,
    ) => {
      if (typeof config === 'number' && value.length !== config) {
        return messags.string.len;
      } else if (Array.isArray(config)) {
        const [min, max] = config;
        if (typeof min === 'number' && value.length < min)
          return typeof max === 'number'
            ? messags.string.range
            : messags.string.min;
        else if (typeof max === 'number' && value.length > max)
          return typeof min === 'number'
            ? messags.string.range
            : messags.string.max;
      } else if (config instanceof RegExp) {
        if (!config.test(value)) {
          return messags.pattern.mismatch;
        }
      }
    },
    number: (value: number, config: number | (number | null | undefined)[]) => {
      if (typeof config === 'number' && value !== config) {
        return messags.number.len;
      } else if (Array.isArray(config)) {
        const [min, max] = config;
        if (typeof min === 'number' && value < min)
          return typeof max === 'number'
            ? messags.number.range
            : messags.number.min;
        else if (typeof max === 'number' && value > max)
          return typeof min === 'number'
            ? messags.number.range
            : messags.number.max;
      }
    },
    array: (
      value: string,
      config: number | (number | null | undefined)[] | RegExp,
    ) => {
      if (typeof config === 'number' && value.length !== config) {
        return messags.string.len;
      } else if (Array.isArray(config)) {
        const [min, max] = config;
        if (typeof min === 'number' && value.length < min)
          return typeof max === 'number'
            ? messags.string.range
            : messags.string.min;
        else if (typeof max === 'number' && value.length > max)
          return typeof min === 'number'
            ? messags.string.range
            : messags.string.max;
      }
    },
    enum: (value: unknown, config: any | any[]) => {
      const _config = Array.isArray(config) ? config : [config];
      if (!_config.length || _config.every(item => !Object.is(value, item))) {
        return messags.enum;
      }
    },
    required: (value: unknown) => {
      if (value === '') return messags.required;
      if (value === null) return messags.required;
      if (value === undefined) return messags.required;
      if (Array.isArray(value) && !value.length) return messags.required;
    },
  }),
);

interface Rule {
  string?: boolean | string | number | (number | null | undefined)[] | RegExp;
  number?: boolean | string | number | (number | null | undefined)[];
  boolean?: boolean | string;
  email?: boolean | string;
  array?: boolean | string;
  object?: boolean | string;
  date?: boolean | string;
  enum?:
    | string
    | number
    | boolean
    | null
    | undefined
    | (string | number | boolean | null | undefined)[];

  required?:boolean
}

interface Validator {
  (name: string, rules: Rule | Rule[]): string | null | undefined;
}

const validator = () => {};
