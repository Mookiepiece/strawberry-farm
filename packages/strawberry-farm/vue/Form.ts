import { Component, MaybeRef, reactive, shallowReactive } from 'vue';
import { IRuleType, RuleS } from '../functions/validator';
import VRadioGroup from './VRadioGroup.vue';
import VInput from './VInput.vue';
import { inc } from '../functions';
import { CommonChoice } from './misc';

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
  for (const _ of pathes) p = p[_];

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
  for (const _ of parents) p = p[_];

  p[last] = value;
};

interface FieldTypes {
  any: MaybeRef<any>;
  text: MaybeRef<InstanceType<typeof VInput>['$props'] & Record<string, any>>;
  textarea: MaybeRef<number | (number | null | undefined)[] | RegExp>;
  number: MaybeRef<any>;
  checkbox: MaybeRef<any>;
  switch: MaybeRef<any>;
  checkboxgroup: MaybeRef<{
    options: CommonChoice[];
  }>;
  select: MaybeRef<{
    options: CommonChoice[];
  }>;
  radio: MaybeRef<{
    options: string[];
  }>;
  list: MaybeRef<any>;
  hidden: undefined;
}

interface FieldTypeBindings {
  any: any;
  text: string;
  textarea: string;
  number: number | null;
  checkbox: boolean;
  switch: boolean;
  checkboxgroup: any[];
  radio: any;
  list: any[];
  hidden: any;
}

type FieldDescriptor<
  Objective,
  ObjectivePath extends Path<Objective>,
  Type extends keyof FieldTypes,
> = {
  label?: string;
  name: ObjectivePath;
  visible?: boolean;

  type?: Type;
  props?: FieldTypes[Type];

  rules?: RuleS<keyof IRuleType, PathValue<Objective, ObjectivePath>>[];

  initialValue?: PathValue<Objective, ObjectivePath>;
  // value: PathValue<Objective, ObjectivePath>;
  error?: string;
};

export type FormModel<Objective> = {
  initialValue: Objective;
  value: Objective;

  submit(): Promise<void>;
  reset(name?: Path<Objective>[]): void;
  reject(name?: Path<Objective>[], message?: 'string'): void;
  focus(name: Path<Objective>): void;
  validate(names?: Path<Objective>[]): Promise<void>;
  /**
   * Set the target field value, value are not able to be type analysed.
   */
  set(name: Path<Objective>, value: any): void;

  action: (formValue: Objective) => void | Promise<void>;

  fields: {
    [P in Path<Objective>]: FieldDescriptor<Objective, P, any>;
  };

  i: (name: Path<Objective>) => Path<Objective>;
};

export const describeForm = <Objective extends object>(
  initialValue: Objective,
  cb: (payload: {
    describeGroup: () => any;
    describeField: <
      PV extends Path<Objective>,
      Type extends keyof FieldTypes = 'text',
    >(
      f: FieldDescriptor<Objective, PV, Type>,
    ) => FieldDescriptor<Objective, PV, Type>;
  }) => void,
): FormModel<Objective> => {
  const value = reactive<Objective>(initialValue as any);

  const fields = shallowReactive<FormModel<Objective>['fields']>({} as any);

  const describeField = <
    PV extends Path<Objective>,
    Type extends keyof FieldTypes,
  >(
    f: FieldDescriptor<Objective, PV, Type>,
  ): FieldDescriptor<Objective, PV, Type> => {
    if ('initialValue' in f)
      pathValueSetter(value as Objective, f.name, f.initialValue);

    (fields as any)[f.name] = f;
    return f;
  };

  cb({
    describeGroup() {},
    describeField,
  });

  return {
    action(formValue) {},
    fields,
    focus(name) {},
    value: value as any,
    initialValue: 1 as any,
    reject() {},
    reset(name) {},
    set(name, value) {},
    async submit() {},
    async validate(names) {},
    i: name => name,
  };
};

export const fieldTypes = new Map<keyof FieldTypes, Component>();

fieldTypes.set('radio', VRadioGroup);
fieldTypes.set('text', VInput);

export const Form = {
  uuid: inc('ARIA'),
  pathValueGetter,
  pathValueSetter,
  describe: describeForm,
  registry: fieldTypes,
};

// type IForm15Pro = {
//   rating: number;
//   usage: 'Good' | 'Bad' | 'other';
//   otherDescritionPro?: {
//     billings: { name: string; value: number; label?: string }[];
//     billingRefs: string[];
//   };

//   duration: [Date | null, Date | null];
//   billings: { name: string; value: number; label?: string }[];
//   billingRefs: string[];
// };

// const form = describeForm<IForm15Pro>(({ describeField: i }) => {
//   i({
//     initialValue: [null, null],
//     name: 'duration',
//     type: 'hidden',
//   });

//   i({
//     initialValue: 'Good',
//     name: 'usage',
//     type: 'hidden',
//   });

//   i({
//     initialValue: 0,
//     name: 'rating',
//     rule: 'string!',
//     type: 'hidden',
//   });

//   i({
//     initialValue: '1',
//     name: 'billingRefs.0',
//     rule: 'string!',
//     type: 'radio',
//     props: {
//       options: computed(() => ['1']),
//     },
//   });

//   i({
//     initialValue: ['1', '2', '3'],
//     name: 'otherDescritionPro.billingRefs',
//     rule: ['array!', [1, 3]],
//     type: 'radio',
//     props: {
//       options: computed(() => ['1']),
//     },
//   });
// });
