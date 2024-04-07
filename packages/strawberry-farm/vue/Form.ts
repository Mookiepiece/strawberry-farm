import { Component, MaybeRef, Ref, reactive, shallowReactive } from 'vue';
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
  radio: 
  InstanceType<typeof VRadioGroup>['$props'] & Record<string, any>;
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

  error?: string;
};

export type FormModel<T> = {
  initialValue: T;
  value: T;

  submit(): Promise<void>;
  reset(name?: Path<T>[]): void;
  reject(name?: Path<T>[], message?: string): void;
  focus(name: Path<T>): void;
  validate(names?: Path<T>[]): Promise<void>;
  /**
   * Set the target field value, value are not able to be type analysed.
   */
  set(name: Path<T>, value: any): void;

  descriptors: {
    [P in Path<T>]: FieldDescriptor<T, P, any>;
  };

  name: (name: Path<T>) => Path<T>;

  hierarchy(
    cb: (payload: {
      group: () => any;
      i: <PV extends Path<T>, Type extends keyof FieldTypes = 'text'>(
        f: FieldDescriptor<T, PV, Type>,
      ) => FieldDescriptor<T, PV, Type>;
    }) => void,
  ): void;

  items: {
    [P in Path<T>]?: {
      focus(): void;
    };
  };
};

export const define = <T extends object>(param: {
  initialValue: T;
  action?(value: T): void | Promise<void>;
}): FormModel<T> => {
  const descriptors = shallowReactive<FormModel<T>['descriptors']>({} as any);

  const i = <PV extends Path<T>, Type extends keyof FieldTypes>(
    f: FieldDescriptor<T, PV, Type>,
  ): FieldDescriptor<T, PV, Type> => {
    (descriptors as any)[f.name] = f;
    return f;
  };

  const _form: FormModel<T> = {
    descriptors,
    focus(name) {},
    value: param.initialValue,
    initialValue: param.initialValue,
    reject() {},
    reset(name) {},
    set(name, value) {},
    async submit() {
      return await param.action?.(_form.value);
    },
    async validate(names) {},
    name: _ => _,

    items: {},

    hierarchy(cb) {
      cb({ group() {}, i });
    },
  };

  const form = reactive(_form) as any;
  return form;
};

export const fieldTypes = new Map<keyof FieldTypes, Component>();

fieldTypes.set('radio', VRadioGroup);
fieldTypes.set('text', VInput);

export const Form = {
  uuid: inc('ARIA'),
  pathValueGetter,
  pathValueSetter,
  define,
  registry: fieldTypes,
};
