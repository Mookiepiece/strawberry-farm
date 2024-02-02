const messages = {
  _field: '字段',

  default: '%s 不匹配格式',
  required: '%s 是必填项',
  checked: '勾选 %s 以继续',
  enum: '%s 不在选项范围内',

  string: '%s 必须为字符类型',
  array: '%s 必须为列表类型',
  number: '%s 必须为数值类型',
  boolean: '%s 必须为布尔类型',
  email: '%s 不是有效的邮箱地址',

  ranges: {
    string: {
      len: '%s 的长度必须为 %a',
      min: '%s 的最小长度为 %a',
      max: '%s 的最大长度为 %a',
      range: '%s 的长度必须在 %a - %b',
    },
    number: {
      len: '%s 必须为 %a',
      min: '%s 的最小值为 %a',
      max: '%s 的最大值为 %a',
      range: '%s 的值必须在 %a - %b',
    },
    array: {
      len: '%s 的长度必须为 %a',
      min: '%s 的最小长度为 %a',
      max: '%s 的最大长度为 %a',
      range: '%s 的长度必须在 %a - %b',
    },
  },
} as const;

const aRE = /\%a/;
const bRE = /\%b/;
const sRE = /\%s/;

const testRange = (
  value: number,
  range: number | (number | null | undefined)[],
  messagegroup: 'number' | 'string' | 'array',
) => {
  if (typeof range === 'number' && value !== range) {
    return messages.ranges[messagegroup].len.replace(aRE, '' + range);
  } else if (Array.isArray(range)) {
    const [min, max] = range;
    if (typeof min === 'number' && value < min)
      return min === max
        ? messages.ranges[messagegroup].range
            .replace(aRE, '' + min)
            .replace(bRE, '' + max)
        : messages.ranges[messagegroup].min.replace(aRE, '' + min);
    else if (typeof max === 'number' && value > max)
      return min === max
        ? messages.ranges[messagegroup].range
            .replace(aRE, '' + min)
            .replace(bRE, '' + max)
        : messages.ranges[messagegroup].max.replace(aRE, '' + max);
  }
};

const emptyRulers = new Map<string, any>(
  Object.entries({
    string: (s: string) => s === '',
  }),
);

const validators = new Map<string, any>(
  Object.entries({
    string: (value: unknown, config: unknown) => {
      if (typeof value !== 'string') return messages.string;

      if (typeof config === 'number' || Array.isArray(config)) {
        return testRange(value.length, config, 'string');
      }
      if (config instanceof RegExp) {
        if (!config.test(value)) {
          return messages.default;
        }
      }
    },
    boolean: (value: unknown, config: unknown) => {
      if (typeof value !== 'boolean') return messages.boolean;
    },
    number: (value: unknown, config: unknown) => {
      if (
        typeof value !== 'number' ||
        !Number.isFinite(value) ||
        Number.isNaN(value)
      )
        return messages.number;

      if (typeof config === 'number' || Array.isArray(config)) {
        return testRange(value, config, 'number');
      }
    },
    array: (value: unknown, config: unknown) => {
      if (!Array.isArray(value)) {
        return messages.array;
      }

      if (typeof config === 'number' || Array.isArray(config)) {
        return testRange(value.length, config, 'array');
      }
    },
    enum: (value: unknown, config: unknown) => {
      const _config = Array.isArray(config) ? config : [config];
      if (!_config.length || _config.every(item => !Object.is(value, item))) {
        return messages.enum;
      }
    },
    type: (value: unknown, config: unknown) => {
      if (config && value && !(value instanceof (config as any))) {
        return messages.default;
      }
    },
    checked: (value: unknown) => {
      if (value !== true) return messages.checked;
    },
    /**
     * Used: https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
     * Candidate: https://github.com/ajv-validator/ajv-formats/blob/4dd65447575b35d0187c6b125383366969e6267e/src/formats.ts#L64
     * Candidate: https://emailregex.com/
     */
    email:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  }),
);

interface IRule {
  string?: boolean | string | number | (number | null | undefined)[] | RegExp;
  number?: boolean | string | number | (number | null | undefined)[];
  boolean?: boolean | string;
  checked?: boolean | string;
  email?: boolean | string;
  array?: boolean | string;
  object?: boolean | string | {};
  type?: any;
  enum?:
    | string
    | number
    | boolean
    | null
    | undefined
    | (string | number | boolean | null | undefined)[];

  // Meta fields
  required?: string | boolean;
  validator?(value: unknown): string | undefined | Promise<string | undefined>;
  message?: string;
}

export type Rule = IRule | keyof IRule;
export type Rules = Rule | Rule[];

interface Validate {
  (
    value: unknown,
    rules: Rules,
    name?: string,
  ): { ok: boolean; message: string };
}

const testNullish = (value: unknown) => value === null || value === undefined;

export const validate: Validate = (value, rules, name = messages._field) => {
  if (!Array.isArray(rules)) rules = [rules];

  let message: undefined | string;

  for (let rule of rules) {
    if (typeof rule === 'string') rule = { [rule]: true };

    const required = typeof rule.required === 'string' || rule.required;
    const messageOfRequired = 
      typeof rule.required === 'string'
        ? rule.required
        : rule.required
          ? messages.required.replace(sRE, name)
          : undefined;

    if (!testNullish(value)) {
      for (const key in rule) {
        if (key === 'required') continue;
        if (key === 'validator') continue;
        if (key === 'message') continue;

        let validator = validators.get(key);
        if (validator) {
          if (validator instanceof RegExp) {
            validator = value => {
              if (typeof value === 'string' && !validator.test(value)) {
                return messages[key] ?? messages.default;
              }
            };
          }

          const config = rule[key as keyof IRule];
          message = validator(value as any, config);
          if (typeof message === 'string') {
            message = message.replace(sRE, name);
            if (typeof config === 'string') message = config;
            break;
          }
        }

        const emptyRuler = emptyRulers.get(key);
        if(required && emptyRuler && emptyRuler(value)) {
          message = messageOfRequired
        }

        if (key === 'validator') {
          const validator = rule[key as 'validator']!;

          if (
            typeof (
              (message = validator(value) as string | undefined) === 'string'
            )
          ) {
            break;
          }
        }
      }
    } else {     
      if (required) {
        message = messageOfRequired;
      }
    }

    if (typeof message === 'string') {
      message = rule.message ?? message;
      break;
    }
  }

  return { ok: typeof message === 'string', message: message || '' };
};
