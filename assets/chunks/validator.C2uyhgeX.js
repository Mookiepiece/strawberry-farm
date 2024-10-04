const n=`export interface IRuleType {\r
  any: undefined;\r
  string: number | (number | null | undefined)[] | RegExp;\r
  number: number | (number | null | undefined)[];\r
  enum: any[];\r
  boolean: undefined;\r
  checked: undefined;\r
  email: undefined;\r
  array: number | (number | null | undefined)[];\r
  type: any;\r
}\r
\r
export interface IRule<\r
  T extends keyof IRuleType = keyof IRuleType,\r
  ValueType = any,\r
> {\r
  type?: T;\r
  config?: IRuleType[T];\r
  required?: boolean;\r
  validator?(value: ValueType): string | void | Promise<string | void>;\r
  message?: string;\r
}\r
\r
export type RuleSlim<\r
  T extends keyof IRuleType = keyof IRuleType,\r
  ValueType = any,\r
> =\r
  | IRule<T, ValueType>\r
  | T\r
  | \`\${T}!\`\r
  | [T | \`\${T}!\`]\r
  | [T | \`\${T}!\`, IRuleType[T]];\r
\r
const unpack = <T extends keyof IRuleType>(slim: RuleSlim<T>): IRule<T> => {\r
  if (typeof slim === 'object' && !Array.isArray(slim)) return slim;\r
\r
  const [a, b] = [\r
    Array.isArray(slim) ? slim[0] : slim,\r
    Array.isArray(slim) ? slim[1] : undefined,\r
  ];\r
\r
  const rule: IRule<T> = {\r
    type: (a.endsWith('!') ? a.slice(0, -1) : a) as T,\r
  };\r
\r
  if (a.endsWith('!')) {\r
    rule.required = true;\r
  }\r
\r
  if (b) {\r
    rule.config = b;\r
  }\r
\r
  return rule;\r
};\r
\r
const defaults = {\r
  fieldname: '字段',\r
};\r
\r
const messages: Record<keyof IRuleType | 'default' | 'required', string> & {\r
  ranges: Partial<\r
    Record<\r
      keyof IRuleType,\r
      { len: string; min: string; max: string; range: string }\r
    >\r
  >;\r
} = {\r
  default: '{{s}} 不匹配格式',\r
  required: '请输入 {{s}}',\r
  checked: '请先检阅 {{s}}',\r
  enum: '{{s}} 不在选项范围内',\r
\r
  any: '{{s}} 必须为任意类型',\r
  string: '{{s}} 必须为字符类型',\r
  array: '{{s}} 必须为列表类型',\r
  number: '{{s}} 必须为数值类型',\r
  boolean: '{{s}} 必须为布尔类型',\r
  email: '{{s}} 不是有效的邮箱地址',\r
  type: '{{s}} 不匹配格式',\r
\r
  ranges: {\r
    string: {\r
      len: '{{s}} 的长度必须等于 {{a}}',\r
      min: '{{s}} 的长度至少为 {{a}}',\r
      max: '{{s}} 的长度至多为 {{a}}',\r
      range: '{{s}} 的长度必须介于 {{a}} - {{b}}',\r
    },\r
    number: {\r
      len: '{{s}} 必须等于 {{a}}',\r
      min: '{{s}} 至少为 {{a}}',\r
      max: '{{s}} 至多为 {{a}}',\r
      range: '{{s}} 的值必须介于 {{a}} - {{b}}',\r
    },\r
    array: {\r
      len: '{{s}} 的长度必须等于 {{a}}',\r
      min: '{{s}} 的长度至少为 {{a}}',\r
      max: '{{s}} 的长度至多为 {{a}}',\r
      range: '{{s}} 的长度必须介于 {{a}} - {{b}}',\r
    },\r
  },\r
} as const;\r
\r
const aRE = /\\{\\{a\\}\\}/;\r
const bRE = /\\{\\{b\\}\\}/;\r
const sRE = /\\{\\{s\\}\\}/;\r
\r
const testRange = (\r
  value: number,\r
  range: number | (number | null | undefined)[],\r
  messagegroup: 'number' | 'string' | 'array',\r
) => {\r
  if (typeof range === 'number' && value !== range) {\r
    return messages.ranges[messagegroup]!.len.replace(aRE, '' + range);\r
  } else if (Array.isArray(range)) {\r
    const [min, max] = range;\r
    if (typeof min === 'number' && value < min)\r
      return min === max\r
        ? messages.ranges[messagegroup]!.len.replace(aRE, '' + min)\r
        : typeof max === 'number'\r
          ? messages.ranges[messagegroup]!.range.replace(aRE, '' + min).replace(\r
              bRE,\r
              '' + max,\r
            )\r
          : messages.ranges[messagegroup]!.min.replace(aRE, '' + min);\r
    else if (typeof max === 'number' && value > max)\r
      return min === max\r
        ? messages.ranges[messagegroup]!.len.replace(aRE, '' + min)\r
        : typeof min === 'number'\r
          ? messages.ranges[messagegroup]!.range.replace(aRE, '' + min).replace(\r
              bRE,\r
              '' + max,\r
            )\r
          : messages.ranges[messagegroup]!.max.replace(aRE, '' + max);\r
  }\r
};\r
\r
const presets = new Map<\r
  keyof IRuleType,\r
  {\r
    type: (value: unknown, config: unknown) => string | void;\r
    testEmpty?(value: unknown, config: unknown): boolean;\r
    extends?: keyof IRuleType;\r
  }\r
>();\r
\r
presets.set('any', {\r
  type: () => {},\r
});\r
\r
presets.set('string', {\r
  type: (value: unknown, config: unknown) => {\r
    if (typeof value !== 'string') return messages.string;\r
\r
    if (typeof config === 'number' || Array.isArray(config)) {\r
      return testRange(value.length, config, 'string');\r
    }\r
    if (config instanceof RegExp) {\r
      if (!config.test(value)) {\r
        return messages.default;\r
      }\r
    }\r
  },\r
  testEmpty: (s: string) => s === '',\r
});\r
\r
presets.set('number', {\r
  type: (value: unknown, config: unknown) => {\r
    if (\r
      typeof value !== 'number' ||\r
      !Number.isFinite(value) ||\r
      Number.isNaN(value)\r
    )\r
      return messages.number;\r
\r
    if (typeof config === 'number' || Array.isArray(config)) {\r
      return testRange(value, config, 'number');\r
    }\r
  },\r
});\r
\r
presets.set('array', {\r
  type: (value: unknown, config: unknown) => {\r
    if (!Array.isArray(value)) {\r
      return messages.array;\r
    }\r
\r
    if (typeof config === 'number' || Array.isArray(config)) {\r
      return testRange(value.length, config, 'array');\r
    }\r
  },\r
});\r
\r
presets.set('enum', {\r
  type: (value: unknown, config: unknown) => {\r
    const _config = Array.isArray(config) ? config : [config];\r
    if (!_config.some(item => Object.is(value, item))) {\r
      return messages.enum;\r
    }\r
  },\r
});\r
\r
presets.set('boolean', {\r
  type: (value: unknown) => {\r
    if (typeof value !== 'boolean') return messages.boolean;\r
  },\r
});\r
\r
presets.set('checked', {\r
  type: (value: unknown) => {\r
    if (value !== true) return messages.checked;\r
  },\r
});\r
\r
presets.set('type', {\r
  type: (value: unknown, config: unknown) => {\r
    if (config && value && !(value instanceof (config as any))) {\r
      return messages.default;\r
    }\r
  },\r
});\r
\r
/**\r
 * Used: https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)\r
 * Candidate: https://github.com/ajv-validator/ajv-formats/blob/4dd65447575b35d0187c6b125383366969e6267e/src/formats.ts#L64\r
 * Candidate: https://emailregex.com/\r
 */\r
const EMAILRE =\r
  /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;\r
\r
presets.set('email', {\r
  extends: 'string',\r
  type(value) {\r
    if (!EMAILRE.test(value as string)) return messages.email;\r
  },\r
});\r
\r
const testNullish = (value: unknown): value is null | undefined =>\r
  value == undefined;\r
\r
export const validate = <T extends keyof IRuleType>(\r
  value: unknown,\r
  _rule: RuleSlim<T>,\r
  name = defaults.fieldname,\r
): void | string | Promise<void | string> => {\r
  const rule = unpack(_rule);\r
\r
  const v = rule.type && presets.get(rule.type);\r
\r
  if (v?.extends) {\r
    const message = validate(value, { ...rule, type: v.extends }, name);\r
    if (message) return message;\r
  }\r
\r
  const empty = testNullish(value) || v?.testEmpty?.(value, rule.config);\r
\r
  if (!rule.required && empty) return;\r
\r
  if (rule.required && empty) {\r
    return rule.message ?? messages.required.replace(sRE, name);\r
  }\r
\r
  const presetErrorMessage = v?.type?.(value, rule.config);\r
  if (typeof presetErrorMessage === 'string') {\r
    return rule.message ?? presetErrorMessage.replace(sRE, name);\r
  }\r
\r
  return rule.validator?.(value);\r
};\r
\r
export const defineRule = <T extends keyof IRuleType>(_: RuleSlim<T>) => _;\r
`;export{n as default};
