const n=`import { InjectionKey, Ref, VNode, reactive, toRaw } from 'vue';\r
import { IRuleType, RuleSlim } from '../shared/validator';\r
import { inc } from '../shared';\r
\r
export const V_FORM_ITEM_LABEL_IN: InjectionKey<{\r
  id: string;\r
  label?: string;\r
  asterisk: boolean;\r
}> = Symbol('VFormItemLabel');\r
\r
export const V_FORM_IN: InjectionKey<FormModel<any>> = Symbol('VForm');\r
\r
/**\r
 * @license MIT react-hook-form\r
 */\r
type Unpathed =\r
  | number\r
  | string\r
  | boolean\r
  | symbol\r
  | bigint\r
  | null\r
  | undefined\r
  | Date\r
  | FileList\r
  | File\r
  | Blob;\r
\r
/**\r
 * @license MIT react-hook-form\r
 */\r
type PathImpl<K extends string | number, V> = V extends Unpathed\r
  ? \`\${K}\`\r
  : \`\${K}\` | \`\${K}.\${PathInternal<V>}\`;\r
\r
/**\r
 * @license MIT react-hook-form\r
 */\r
type PathInternal<T> =\r
  T extends Array<infer I>\r
    ? PathImpl<number, I>\r
    : { [K in keyof T]-?: PathImpl<K & string, T[K]> }[keyof T];\r
\r
/**\r
 * @license MIT react-hook-form\r
 */\r
export type Path<T> = T extends any ? PathInternal<T> : never;\r
\r
/**\r
 * @license MIT react-hook-form\r
 */\r
type PathValue<T, P extends Path<T>> = T extends Unpathed\r
  ? T\r
  : P extends \`\${infer A}.\${infer B}\`\r
    ? A extends keyof T\r
      ? B extends Path<T[A]>\r
        ? PathValue<T[A], B>\r
        : never\r
      : B extends \`\${number}\`\r
        ? T extends Array<infer I>\r
          ? PathValue<I, B & Path<I>>\r
          : never\r
        : never\r
    : P extends keyof T\r
      ? T[P]\r
      : P extends \`\${number}\`\r
        ? T extends Array<infer I>\r
          ? I\r
          : never\r
        : never;\r
\r
export const getter = <T, P extends Path<T>>(object: T, path: P) => {\r
  const pathes = path.split('.');\r
\r
  let p: any = object;\r
  for (const _ of pathes) p = p?.[_];\r
  return p;\r
};\r
\r
export const setter = <T, P extends Path<T>>(\r
  object: T,\r
  path: P,\r
  value: PathValue<T, P>,\r
) => {\r
  const pathes = path.split('.');\r
  const parents = pathes.slice(0, -1);\r
  const last = pathes[pathes.length - 1];\r
\r
  let p: any = object;\r
  for (const _ of parents) {\r
    p = p[_];\r
    if (!p) return;\r
  }\r
\r
  p[last] = value;\r
};\r
\r
export const deleter = <T, P extends Path<T>>(object: T, path: P) => {\r
  const pathes = path.split('.');\r
  const parents = pathes.slice(0, -1);\r
  const last = pathes[pathes.length - 1];\r
\r
  let p: any = object;\r
  for (const _ of parents) {\r
    p = p[_];\r
    if (!p) return;\r
  }\r
\r
  delete p[last];\r
};\r
\r
type FieldDescriptor<T, K extends keyof T> = {\r
  label?: string;\r
  visible?: Ref<boolean>;\r
\r
  render?: () => VNode;\r
\r
  rules?: RuleSlim<keyof IRuleType, T[K]>[];\r
\r
  init?: T[K] extends Array<infer I> ? () => I : never;\r
  children?: T[K] extends Array<infer I>\r
    ?\r
        | ((row: I, index: number) => FieldDescriptor<T[K], number>)\r
        | FieldDescriptor<T[K], number>\r
    : T[K] extends Unpathed\r
      ? never\r
      : {\r
          [K2 in NonNullable<keyof T[K]>]?: FieldDescriptor<T[K], K2>;\r
        };\r
};\r
\r
export type FormModel<T> = {\r
  value: T;\r
  loading: boolean;\r
  submit(): Promise<void>;\r
  reset(init: () => T): void;\r
  validate(): Promise<string | void>;\r
\r
  hierarchy(f: {\r
    [K in NonNullable<keyof T>]?: FieldDescriptor<T, K>;\r
  }): void;\r
\r
  _h: (name: Path<T>) => FieldDescriptor<any, any>;\r
  i: <P extends Path<T>>(name: P) => P;\r
\r
  items: {\r
    [P in Path<T>]?: {\r
      focus(): void;\r
      validate(): Promise<string | void>;\r
      _visible: boolean;\r
      message: string | undefined;\r
    };\r
  };\r
};\r
\r
const init = <T extends object>(\r
  _init: () => T,\r
  param: {\r
    action:\r
      | ((value: T) => void | Promise<void>)\r
      | [(value: T) => void | Promise<void>, (message: string) => void];\r
  },\r
): FormModel<T> => {\r
  let init = _init;\r
  let _h: FieldDescriptor<any, any> = {} as any;\r
\r
  const [action, failedAction] = Array.isArray(param.action)\r
    ? param.action\r
    : [param.action];\r
\r
  const form = reactive<FormModel<T>>({\r
    value: init(),\r
    reset(_init) {\r
      if (_init) init = _init;\r
      form.value = init();\r
    },\r
\r
    loading: false,\r
    async submit() {\r
      form.loading = true;\r
      try {\r
        const v = toRaw(form.value);\r
\r
        Object.entries(form.items)\r
          .filter(\r
            ([, i]) =>\r
              !(i as NonNullable<(typeof form.items)[Path<T>]>)._visible,\r
          )\r
          .forEach(([name]) => deleter(v, name as Path<T>));\r
\r
        const message = await form.validate();\r
        if (typeof message === 'string') {\r
          failedAction?.(message);\r
          throw new DOMException('', 'AbortError');\r
        }\r
\r
        return await action?.(v);\r
      } finally {\r
        form.loading = false;\r
      }\r
    },\r
\r
    _h: <P extends Path<T>>(name: P): FieldDescriptor<any, any> => {\r
      let pathes = name.split('.');\r
\r
      let p: any = _h;\r
      while (pathes.length) {\r
        const i = pathes.shift()!;\r
        p = p[i]?.children ?? p[i];\r
        if (!p) return {};\r
      }\r
      return p;\r
    },\r
    i: _ => _,\r
\r
    async validate() {\r
      const tasks = Object.entries(form.items)\r
        .filter(\r
          ([, i]) => (i as NonNullable<(typeof form.items)[Path<T>]>)._visible,\r
        )\r
        .map(\r
          ([k, i]) =>\r
            [\r
              k,\r
              (i as NonNullable<(typeof form.items)[Path<T>]>).validate(),\r
            ] as [Path<T>, Promise<string | void>],\r
        );\r
      const ans = await Promise.all(tasks.map(([, t]) => t));\r
      const index = ans.findIndex(a => typeof a === 'string');\r
      if (index !== -1) {\r
        const name = tasks[index][0];\r
        form.items[name]?.focus();\r
        return ans[index];\r
      }\r
    },\r
\r
    items: {},\r
\r
    hierarchy: h => void (_h = h),\r
  }) as FormModel<T>;\r
\r
  return form;\r
};\r
\r
export const Form = {\r
  inc: inc('FORM'),\r
  getter,\r
  setter,\r
  init,\r
};\r
`;export{n as default};
