import { Component, MaybeRef, Ref, reactive, toRaw } from 'vue';
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

export const pathValueGetter = <Objective>(object: Objective, path: string) => {
  const pathes = path.split('.');

  let p: any = object;
  for (const _ of pathes) {
    p = p[_];
    if (!p) return p;
  }

  return p;
};

export const pathValueSetter = <Objective>(
  object: Objective,
  path: string,
  value: any,
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
  item?: T[K] extends Array<infer I>
    ?
        | ((row: I, index: number) => FieldDescriptor<T[K], number>)
        | FieldDescriptor<T[K], number>
    : never;
  keys?: T[K] extends Unpathed
    ? never
    : {
        [K2 in keyof T[K]]: FieldDescriptor<T[K], K2>;
      };
};

type FormHierarchy<T> =
  {
    descriptor: FieldDescriptor<T, keyof T>;
    model: Ref<T>;
    message: string | undefined;
    focus(): void;
    reset(): void;
    validate(): Promise<string | void>;
  } & T extends Array<infer T>
    ? Record<
        number,
        {
          [K in keyof T]: FormHierarchy<T[K]>;
        }
      >
    : {
        [K in keyof T]: FormHierarchy<T[K]>;
      };

export type FormModel<T> = {
  value: T;
  submitting: boolean;
  submit(): Promise<void>;
  reset(init: () => T): void;
  validate(): Promise<string | void>;

  descriptor: {
    [K in keyof T]: FieldDescriptor<T, K>;
  };

  _hierarchy: {
    [K in keyof T]: FieldDescriptor<T, K>;
  };
  hierarchy(f: {
    [K in keyof T]: FieldDescriptor<T, K>;
  }): void;

  items: {
    [P in keyof T]?: {
      focus(): void;
      validate(): Promise<string | void>;
      message: Ref<string | undefined>;
    };
  };
};

export const define = <T extends object>(param: {
  init: () => T;
  action?(value: T): void | Promise<void>;
}): FormModel<T> => {
  let init = param.init;

  const form = reactive<FormModel<T>>({
    value: param.init(),
    descriptor: {} as any,
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

    _hierarchy: {} as any,
    hierarchy(h) {
      form._hierarchy = h;
      // TODO
    },
  }) as FormModel<T>;

  // const name =

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
