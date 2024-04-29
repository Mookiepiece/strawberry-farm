import { InjectionKey, MaybeRef, Ref, VNode, reactive, toRaw } from 'vue';
import { IRuleType, RuleSlim } from '../functions/validator';
import { inc } from '../functions';

export const V_FORM_ITEM_LABEL_IN: InjectionKey<{
  id: string;
  label?: string;
  asterisk: boolean;
}> = Symbol('VFormItemLabel');

export const V_FORM_IN: InjectionKey<FormModel<any>> = Symbol('VForm');

/**
 * @license MIT react-hook-form
 */
type Unpathed =
  | number
  | string
  | boolean
  | symbol
  | bigint
  | null
  | undefined
  | Date
  | FileList
  | File
  | Blob;

/**
 * @license MIT react-hook-form
 */
type PathImpl<K extends string | number, V> = V extends Unpathed
  ? `${K}`
  : `${K}` | `${K}.${PathInternal<V>}`;

/**
 * @license MIT react-hook-form
 */
type PathInternal<T> =
  T extends Array<infer I>
    ? PathImpl<number, I>
    : { [K in keyof T]-?: PathImpl<K & string, T[K]> }[keyof T];

/**
 * @license MIT react-hook-form
 */
export type Path<T> = T extends any ? PathInternal<T> : never;

/**
 * @license MIT react-hook-form
 */
type PathValue<T, P extends Path<T>> = T extends Unpathed
  ? T
  : P extends `${infer A}.${infer B}`
    ? A extends keyof T
      ? B extends Path<T[A]>
        ? PathValue<T[A], B>
        : never
      : B extends `${number}`
        ? T extends Array<infer I>
          ? PathValue<I, B & Path<I>>
          : never
        : never
    : P extends keyof T
      ? T[P]
      : P extends `${number}`
        ? T extends Array<infer I>
          ? I
          : never
        : never;

export const getter = <T, P extends Path<T>>(object: T, path: P) => {
  const pathes = path.split('.');

  let p: any = object;
  for (const _ of pathes) p = p?.[_];
  return p;
};

export const setter = <T, P extends Path<T>>(
  object: T,
  path: P,
  value: PathValue<T, P>,
) => {
  const pathes = path.split('.');
  const parents = pathes.slice(0, -1);
  const last = pathes[pathes.length - 1];

  let p: any = object;
  for (const _ of parents) {
    p = p[_];
    if (!p) return;
  }

  p[last] = value;
};

export const deleter = <T, P extends Path<T>>(object: T, path: P) => {
  const pathes = path.split('.');
  const parents = pathes.slice(0, -1);
  const last = pathes[pathes.length - 1];

  let p: any = object;
  for (const _ of parents) {
    p = p[_];
    if (!p) return;
  }

  delete p[last];
};

type FieldDescriptor<T, K extends keyof T> = {
  label?: string;
  visible?: Ref<boolean>;

  render?: () => VNode;

  rules?: RuleSlim<keyof IRuleType, T[K]>[];

  init?: T[K] extends Array<infer I> ? () => I : never;
  children?: T[K] extends Array<infer I>
    ?
        | ((row: I, index: number) => FieldDescriptor<T[K], number>)
        | FieldDescriptor<T[K], number>
    : T[K] extends Unpathed
      ? never
      : {
          [K2 in NonNullable<keyof T[K]>]?: FieldDescriptor<T[K], K2>;
        };
};

export type FormModel<T> = {
  value: T;
  loading: boolean;
  submit(): Promise<void>;
  reset(init: () => T): void;
  validate(): Promise<string | void>;

  hierarchy(f: {
    [K in NonNullable<keyof T>]?: FieldDescriptor<T, K>;
  }): void;

  _h: (name: Path<T>) => FieldDescriptor<any, any>;
  i: <P extends Path<T>>(name: P) => P;

  items: {
    [P in Path<T>]?: {
      focus(): void;
      validate(): Promise<string | void>;
      _visible: boolean;
      message: string | undefined;
    };
  };
};

const init = <T extends object>(
  _init: () => T,
  param: {
    action:
      | ((value: T) => void | Promise<void>)
      | [(value: T) => void | Promise<void>, (message: string) => void];
  },
): FormModel<T> => {
  let init = _init;
  let _h: FieldDescriptor<any, any> = {} as any;

  const [action, failedAction] = Array.isArray(param.action)
    ? param.action
    : [param.action];

  const form = reactive<FormModel<T>>({
    value: init(),
    reset(_init) {
      if (_init) init = _init;
      form.value = init();
    },

    loading: false,
    async submit() {
      form.loading = true;
      try {
        const v = toRaw(form.value);

        Object.entries(form.items)
          .filter(
            ([, i]) =>
              !(i as NonNullable<(typeof form.items)[Path<T>]>)._visible,
          )
          .forEach(([name]) => deleter(v, name as Path<T>));

        const message = await form.validate();
        if (typeof message === 'string') {
          failedAction?.(message);
          throw new DOMException('', 'AbortError');
        }

        return await action?.(v);
      } finally {
        form.loading = false;
      }
    },

    _h: <P extends Path<T>>(name: P): FieldDescriptor<any, any> => {
      let pathes = name.split('.');

      let p: any = _h;
      while (pathes.length) {
        const i = pathes.shift()!;
        p = p[i]?.children ?? p[i];
        if (!p) return {};
      }
      return p;
    },
    i: _ => _,

    async validate() {
      const tasks = Object.entries(form.items)
        .filter(
          ([, i]) => (i as NonNullable<(typeof form.items)[Path<T>]>)._visible,
        )
        .map(
          ([k, i]) =>
            [
              k,
              (i as NonNullable<(typeof form.items)[Path<T>]>).validate(),
            ] as [Path<T>, Promise<string | void>],
        );
      const ans = await Promise.all(tasks.map(([, t]) => t));
      const index = ans.findIndex(a => typeof a === 'string');
      if (index !== -1) {
        const name = tasks[index][0];
        form.items[name]?.focus();
        return ans[index];
      }
    },

    items: {},

    hierarchy: h => void (_h = h),
  }) as FormModel<T>;

  return form;
};

export const Form = {
  inc: inc('FORM'),
  getter,
  setter,
  init,
};
