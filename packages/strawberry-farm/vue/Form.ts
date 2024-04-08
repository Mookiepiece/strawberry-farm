import {
  Component,
  MaybeRef,
  Ref,
  reactive,
  shallowReactive,
  toRaw,
} from 'vue';
import { IRuleType, RuleS } from '../functions/validator';
import VRadioGroup from './VRadioGroup.vue';
import VInput from './VInput.vue';
import { inc } from '../functions';
import { CommonOption, CommonOptionGroup } from './misc';

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

export const pathValueGetter = <
  Objective,
  ObjectivePath extends Path<Objective>,
>(
  object: Objective,
  path: ObjectivePath,
) => {
  const pathes = path.split('.');

  let p: any = object;
  for (const _ of pathes) {
    p = p[_];
    if (!p) return p;
  }

  return p;
};

export const pathValueSetter = <
  Objective,
  ObjectivePath extends Path<Objective>,
>(
  object: Objective,
  path: ObjectivePath,
  value: PathValue<Objective, ObjectivePath>,
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

type FieldDescriptor<T, P extends Path<T>, Type extends keyof FieldTypes> = {
  label?: string;
  name: P;
  visible?: Ref<boolean>;

  type?: Type;
  props?: MaybeRef<FieldTypes[Type]>;

  rules?: RuleS<keyof IRuleType, PathValue<T, P>>[];

  childInit?: PathValue<T, P> extends Array<infer I> ? () => I : undefined;
  children?: PathValue<T, P> extends Array<infer I>
    ?
        | ((
            row: I,
            index: number,
          ) => FieldDescriptor<I, Path<I>, keyof FieldTypes>[])
        | FieldDescriptor<I, Path<I>, keyof FieldTypes>[]
    : undefined;
};

export type FormModel<T> = {
  value: T;
  setInitialValue(cb: () => T): void;
  submitting: boolean;
  submit(): Promise<void>;
  reset(): void;
  reject(name: Path<T>, message?: string): void;
  focus(name: Path<T>): void;
  validate(name?: Path<T>): Promise<string | void>;

  descriptors: {
    [P in Path<T>]: FieldDescriptor<T, P, any>;
  };

  name: (name: Path<T>) => Path<T>;

  hierarchy(
    cb: (payload: {
      group: () => any;
      i: <PV extends Path<T>, Type extends keyof FieldTypes>(
        f: FieldDescriptor<T, PV, Type>,
      ) => FieldDescriptor<T, PV, Type>;
    }) => void,
  ): void;

  items: {
    [P in Path<T>]?: {
      focus(): void;
      validate(): Promise<string | void>;
      message: Ref<string | undefined>;
    };
  };
};

export const define = <T extends object>(param: {
  initialValue: () => T;
  action?(value: T): void | Promise<void>;
}): FormModel<T> => {
  const descriptors = shallowReactive<FormModel<T>['descriptors']>({} as any);

  const i = <PV extends Path<T>, Type extends keyof FieldTypes>(
    f: FieldDescriptor<T, PV, Type>,
  ): FieldDescriptor<T, PV, Type> => {
    (descriptors as any)[f.name] = f;
    return f;
  };

  let initialValue = param.initialValue;

  const form = reactive<FormModel<T>>({
    value: param.initialValue(),
    descriptors,
    focus(name) {
      form.items[name]?.focus();
    },
    reject(name, message) {
      const m = form.items[name]?.message;
      if (m) m.value = message;
    },
    setInitialValue(cb) {
      initialValue = cb;
    },
    reset() {
      form.value = initialValue();
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
    async validate(names) {
      const filter = ([k]: [string, any]) => !names || names.includes(k);

      const tasks = Object.entries(form.items)
        .filter(filter)
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
    name: _ => _,

    items: {},

    hierarchy(cb) {
      cb({ group() {}, i });
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
