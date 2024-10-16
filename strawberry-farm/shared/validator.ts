export interface IRuleType {
  any: undefined;
  string: number | (number | null | undefined)[] | RegExp;
  number: number | (number | null | undefined)[];
  enum: any[];
  boolean: undefined;
  checked: undefined;
  email: undefined;
  array: number | (number | null | undefined)[];
  type: any;
}

export interface IRule<
  T extends keyof IRuleType = keyof IRuleType,
  ValueType = any,
> {
  type?: T;
  config?: IRuleType[T];
  required?: boolean;
  validator?(value: ValueType): string | void | Promise<string | void>;
  message?: string;
}

export type RuleSlim<
  T extends keyof IRuleType = keyof IRuleType,
  ValueType = any,
> =
  | IRule<T, ValueType>
  | T
  | `${T}!`
  | [T | `${T}!`]
  | [T | `${T}!`, IRuleType[T]];

const unpack = <T extends keyof IRuleType>(slim: RuleSlim<T>): IRule<T> => {
  if (typeof slim === 'object' && !Array.isArray(slim)) return slim;

  const [a, b] = [
    Array.isArray(slim) ? slim[0] : slim,
    Array.isArray(slim) ? slim[1] : undefined,
  ];

  const rule: IRule<T> = {
    type: (a.endsWith('!') ? a.slice(0, -1) : a) as T,
  };

  if (a.endsWith('!')) {
    rule.required = true;
  }

  if (b) {
    rule.config = b;
  }

  return rule;
};

const defaults = {
  fieldname: '字段',
};

const messages: Record<keyof IRuleType | 'default' | 'required', string> & {
  ranges: Partial<
    Record<
      keyof IRuleType,
      { len: string; min: string; max: string; range: string }
    >
  >;
} = {
  default: '{{s}} 不匹配格式',
  required: '请输入 {{s}}',
  checked: '请先检阅 {{s}}',
  enum: '{{s}} 不在选项范围内',

  any: '{{s}} 必须为任意类型',
  string: '{{s}} 必须为字符类型',
  array: '{{s}} 必须为列表类型',
  number: '{{s}} 必须为数值类型',
  boolean: '{{s}} 必须为布尔类型',
  email: '{{s}} 不是有效的邮箱地址',
  type: '{{s}} 不匹配格式',

  ranges: {
    string: {
      len: '{{s}} 的长度必须等于 {{a}}',
      min: '{{s}} 的长度至少为 {{a}}',
      max: '{{s}} 的长度至多为 {{a}}',
      range: '{{s}} 的长度必须介于 {{a}} - {{b}}',
    },
    number: {
      len: '{{s}} 必须等于 {{a}}',
      min: '{{s}} 至少为 {{a}}',
      max: '{{s}} 至多为 {{a}}',
      range: '{{s}} 的值必须介于 {{a}} - {{b}}',
    },
    array: {
      len: '{{s}} 的长度必须等于 {{a}}',
      min: '{{s}} 的长度至少为 {{a}}',
      max: '{{s}} 的长度至多为 {{a}}',
      range: '{{s}} 的长度必须介于 {{a}} - {{b}}',
    },
  },
} as const;

const aRE = /\{\{a\}\}/;
const bRE = /\{\{b\}\}/;
const sRE = /\{\{s\}\}/;

const testRange = (
  value: number,
  range: number | (number | null | undefined)[],
  messagegroup: 'number' | 'string' | 'array',
) => {
  if (typeof range === 'number' && value !== range) {
    return messages.ranges[messagegroup]!.len.replace(aRE, '' + range);
  } else if (Array.isArray(range)) {
    const [min, max] = range;
    if (typeof min === 'number' && value < min)
      return min === max
        ? messages.ranges[messagegroup]!.len.replace(aRE, '' + min)
        : typeof max === 'number'
          ? messages.ranges[messagegroup]!.range.replace(aRE, '' + min).replace(
              bRE,
              '' + max,
            )
          : messages.ranges[messagegroup]!.min.replace(aRE, '' + min);
    else if (typeof max === 'number' && value > max)
      return min === max
        ? messages.ranges[messagegroup]!.len.replace(aRE, '' + min)
        : typeof min === 'number'
          ? messages.ranges[messagegroup]!.range.replace(aRE, '' + min).replace(
              bRE,
              '' + max,
            )
          : messages.ranges[messagegroup]!.max.replace(aRE, '' + max);
  }
};

const presets = new Map<
  keyof IRuleType,
  {
    type: (value: unknown, config: unknown) => string | void;
    testEmpty?(value: unknown, config: unknown): boolean;
    extends?: keyof IRuleType;
  }
>();

presets.set('any', {
  type: () => {},
});

presets.set('string', {
  type: (value: unknown, config: unknown) => {
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
  testEmpty: (s: string) => s === '',
});

presets.set('number', {
  type: (value: unknown, config: unknown) => {
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
});

presets.set('array', {
  type: (value: unknown, config: unknown) => {
    if (!Array.isArray(value)) {
      return messages.array;
    }

    if (typeof config === 'number' || Array.isArray(config)) {
      return testRange(value.length, config, 'array');
    }
  },
});

presets.set('enum', {
  type: (value: unknown, config: unknown) => {
    const _config = Array.isArray(config) ? config : [config];
    if (!_config.some(item => Object.is(value, item))) {
      return messages.enum;
    }
  },
});

presets.set('boolean', {
  type: (value: unknown) => {
    if (typeof value !== 'boolean') return messages.boolean;
  },
});

presets.set('checked', {
  type: (value: unknown) => {
    if (value !== true) return messages.checked;
  },
});

presets.set('type', {
  type: (value: unknown, config: unknown) => {
    if (config && value && !(value instanceof (config as any))) {
      return messages.default;
    }
  },
});

/**
 * Used: https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
 * Candidate: https://github.com/ajv-validator/ajv-formats/blob/4dd65447575b35d0187c6b125383366969e6267e/src/formats.ts#L64
 * Candidate: https://emailregex.com/
 */
const EMAILRE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

presets.set('email', {
  extends: 'string',
  type(value) {
    if (!EMAILRE.test(value as string)) return messages.email;
  },
});

const testNullish = (value: unknown): value is null | undefined =>
  value == undefined;

export const validate = <T extends keyof IRuleType>(
  value: unknown,
  _rule: RuleSlim<T>,
  name = defaults.fieldname,
): void | string | Promise<void | string> => {
  const rule = unpack(_rule);

  const v = rule.type && presets.get(rule.type);

  if (v?.extends) {
    const message = validate(value, { ...rule, type: v.extends }, name);
    if (message) return message;
  }

  const empty = testNullish(value) || v?.testEmpty?.(value, rule.config);

  if (!rule.required && empty) return;

  if (rule.required && empty) {
    return rule.message ?? messages.required.replace(sRE, name);
  }

  const presetErrorMessage = v?.type?.(value, rule.config);
  if (typeof presetErrorMessage === 'string') {
    return rule.message ?? presetErrorMessage.replace(sRE, name);
  }

  return rule.validator?.(value);
};

export const defineRule = <T extends keyof IRuleType>(_: RuleSlim<T>) => _;
