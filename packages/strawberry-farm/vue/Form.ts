import { Component, MaybeRef, Ref, computed, reactive, toRaw } from 'vue';
import { IRuleType, RuleSlim } from '../functions/validator';
import VRadioGroup from './VRadioGroup.vue';
import VInput from './VInput.vue';
import { CommonOption, CommonOptionGroup } from './misc';
import { inc } from '../functions';

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

export const pathValueGetter = <T, P extends Path<T>>(object: T, path: P) => {
  const pathes = path.split('.');

  let p: any = object;
  for (const _ of pathes) {
    p = p[_];
    if (!p) return p;
  }

  return p;
};

export const pathValueSetter = <T, P extends Path<T>>(
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

interface FieldTypes {
  any: any;
  text: InstanceType<typeof VInput>['$props'] & Record<string, any>;
  textarea: number | (number | null | undefined)[] | RegExp;
  number: any;
  checkbox: any;
  switch: any;
  checkboxgroup: {
    options: (CommonOption | CommonOptionGroup)[];
  };
  select: {
    options: (CommonOption | CommonOptionGroup)[];
  };
  radio: InstanceType<typeof VRadioGroup>['$props'] & Record<string, any>;
  list: any;
  hidden: undefined;
}

type FiledTypesTurple = {
  [K in keyof FieldTypes]: [K, FieldTypes[K]] | K;
}[keyof FieldTypes];

type FieldDescriptor<T, K extends keyof T> = {
  label?: string;
  visible?: Ref<boolean>;

  type?: MaybeRef<FiledTypesTurple>;

  rules?: RuleSlim<keyof IRuleType, T[K]>[];

  init?: T[K] extends Array<infer I> ? () => I : never;
  children?: T[K] extends Array<infer I>
    ?
        | ((row: I, index: number) => FieldDescriptor<T[K], number>)
        | FieldDescriptor<T[K], number>
    : T[K] extends Unpathed
      ? never
      : {
          [K2 in NonNullable<keyof T[K]>]: FieldDescriptor<T[K], K2>;
        };
};

export type FormHierarchy<T> = {
  descriptor: FieldDescriptor<T, keyof T>;
  model: Ref<T>;
  message: string | undefined;
  focus(): void;
  reset(): void;
  validate(): Promise<string | void>;
} & (T extends Unpathed
  ? Record<string, never>
  : T extends Array<infer T>
    ? {
        children: FormHierarchy<T>;
      }
    : {
        [K in NonNullable<keyof T>]: FormHierarchy<T[K]>;
      });

export type FormModel<T> = {
  value: T;
  submitting: boolean;
  submit(): Promise<void>;
  reset(init: () => T): void;
  reject(name: Path<T>, message?: string): void;
  focus(name: Path<T>): void;
  validate(name?: Path<T>): Promise<string | void>;

  hierarchy(f: {
    [K in NonNullable<keyof T>]: FieldDescriptor<T, K>;
  }): void;

  items: {
    [P in Path<T>]?: {
      focus(): void;
      reset(): void;
      validate(): Promise<string | void>;
      message: Ref<string | undefined>;
      descriptor: FieldDescriptor<PathValue<T, P>, keyof PathValue<T, P>>;
    };
  };
};

export const define = <T extends object>(param: {
  init: () => T;
  action?(value: T): void | Promise<void>;
}): FormModel<T> => {
  let init = param.init;

  // const d = new Proxy()

  const form = reactive<FormModel<T>>({
    value: param.init(),
    reset(_init) {
      if (_init) init = _init;

      form.value = init();
    },

    submitting: false,
    async submit() {
      form.submitting = true;
      try {
        const v = toRaw(form.value);
        if (typeof (await form.validate()) !== 'string')
          return await param.action?.(v);
        throw new DOMException('', 'AbortError');
      } finally {
        form.submitting = false;
      }
    },
    async validate() {
      // const tasks = Object.entries(form.items)
      //   .map(
      //     ([k, i]) =>
      //       [
      //         k,
      //         (i as NonNullable<(typeof form.items)[Path<T>]>).validate(),
      //       ] as [Path<T>, Promise<string | void>],
      //   );
      // const ans = await Promise.all(tasks.map(([, t]) => t));
      // const index = ans.findIndex(a => typeof a === 'string');
      // if (index !== -1) {
      //   const name = tasks[index][0];
      //   form.items[name]?.focus();
      //   return ans[index];
      // }
    },

    items: {},

    hierarchy(h) {
      const toD = <T>(h: FieldDescriptor<T, keyof T>): FormHierarchy<T> => {
        return {
          descriptor: h,
          model: computed(() => {
            //
            return {} as any;
          }),
          message: undefined,
          focus() {
            throw new Error('Not supported');
          },
          validate() {
            throw new Error('Not supported');
          },
          reset() {
            throw new Error('Not supported');
          },
        } as any;
        // if (h && typeof h === 'object') {
        // }
      };

      // const d: FormModel<T>['d'] = (form.d = h);
      // TODO
    },
  }) as FormModel<T>;

  return form;
};

export const fieldTypes = new Map<keyof FieldTypes, Component>();

fieldTypes.set('radio', VRadioGroup);
fieldTypes.set('text', VInput);

export const Form = {
  uuid: inc('FORM'),
  pathValueGetter,
  pathValueSetter,
  define,
  registry: fieldTypes,
};
