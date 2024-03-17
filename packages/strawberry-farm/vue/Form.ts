import { ComputedRef, computed, reactive } from 'vue';
import { IRuleType, RuleS } from '../functions/validator';

type IForm15Pro = {
  rating: number;
  usage: 'Good' | 'Bad' | 'other';
  otherDescritionPro?: {
    billings: { name: string; value: number; label?: string }[];
    billingRefs: string[];
  };

  duration: [Date | null, Date | null];
  billings: { name: string; value: number; label?: string }[];
  billingRefs: string[];
};

// react-hook-form
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

// react-hook-form
type PathImpl<K extends string | number, V> = V extends Unpathed
  ? `${K}`
  : `${K}` | `${K}.${PathInternal<V>}`;

// react-hook-form
type PathInternal<T> =
  T extends Array<infer I>
    ? PathImpl<number, I>
    : { [K in keyof T]-?: PathImpl<K & string, T[K]> }[keyof T];

// react-hook-form
export type Path<T> = T extends any ? PathInternal<T> : never;

// react-hook-form
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
  const last = pathes[pathes.length];

  let p: any = object;
  for (const _ of parents) p = p[_];

  p[last] = value;
};

// TODO: get out
type CommonChoice =
  | string
  | number
  | boolean
  | null
  | {
      label?: string;
      value: any;
      disabled?: boolean;
    };

type ValueOrReactive<T> = T | ComputedRef<T>;

interface FieldTypes {
  any: ValueOrReactive<any>;
  text: ValueOrReactive<number | (number | null | undefined)[] | RegExp>;
  radio: ValueOrReactive<{
    options: ValueOrReactive<CommonChoice[]>;
  }>;
  hidden: undefined;
}

interface FieldTypeBindings {
  any: any;
  text: string;
  number: number;
  radio: any;
  hidden: any;
}

type FieldDescriptor<
  Objective,
  ObjectivePath extends Path<Objective>,
  Type extends keyof FieldTypes,
> = {
  label?: string;
  name: ObjectivePath;

  type: Type;
  props?: FieldTypes[Type];

  rule?: RuleS<keyof IRuleType, PathValue<Objective, ObjectivePath>>;
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

  fields: FieldDescriptor<Objective, any, any>[];
};

export const describeForm = <Objective>(
  cb: (payload: {
    describeGroup: () => any;
    describeField: <PV extends Path<Objective>, Type extends keyof FieldTypes>(
      f: FieldDescriptor<Objective, PV, Type>,
    ) => FieldDescriptor<Objective, PV, Type>;
  }) => void,
): FormModel<Objective> => {
  const value = reactive({});

  const describeField = <
    PV extends Path<Objective>,
    Type extends keyof FieldTypes,
  >(
    f: FieldDescriptor<Objective, PV, Type>,
  ): FieldDescriptor<Objective, PV, Type> => {
    return f;
  };

  return {
    action(formValue) {},
    fields: [],
    focus(name) {},
    value: 1 as any,
    initialValue: 1 as any,
    reject() {},
    reset(name) {},
    set(name, value) {},
    async submit() {},
    async validate(names) {},
  };
};

const describeField = <Objective>() => {};

const form = describeForm<IForm15Pro>(({ describeField: i }) => {
  i({
    initialValue: [null, null],
    name: 'duration',
    type: 'hidden',
  });

  i({
    initialValue: 'Good',
    name: 'usage',
    type: 'hidden',
  });

  i({
    initialValue: 0,
    name: 'rating',
    rule: 'string!',
    type: 'hidden',
  });

  i({
    initialValue: '1',
    name: 'billingRefs.0',
    rule: 'string!',
    type: 'radio',
    props: {
      options: computed(() => ['1']),
    },
  });

  i({
    initialValue: ['1', '2', '3'],
    name: 'otherDescritionPro.billingRefs',
    rule: ['array!', [1, 3]],
    type: 'radio',
    props: {
      options: computed(() => ['1']),
    },
  });
});
