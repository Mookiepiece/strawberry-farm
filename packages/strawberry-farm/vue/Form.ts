import { ComputedRef, computed } from 'vue';
import { RuleS } from '../functions/validator';

type IForm15Pro = {
  // name: string;
  // type: 'A' | 'B' | 'C';

  rating: number;
  // temperature: number;

  usage: 'Good' | 'Bad' | 'other';
  // otherDescrtion?: string;
  // otherDescrtionScreenshot: Blob;

  otherDescritionPro?: {
    // text?: string;
    // screenshot: Blob;
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

// TODO: get out
type CommonChoice =
  | string
  | number
  | boolean
  | null
  | {
      label: string;
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

  rule?: RuleS;
  rules?: RuleS[];

  initialValue: PathValue<Objective, ObjectivePath>;
  // value: PathValue<Objective, ObjectivePath>;
  error?: string;
};

// type FieldRuntime<Objective, ObjectivePath extends Path<Objective>> = {
//   descriptor:
// }

type SFFormModel<Objective> = {
  reject(name?: Path<Objective>[], message?: 'string'): Promise<void>;
  focus(name: Path<Objective>): void;
  validate(names?: Path<Objective>[]): Promise<void>;
  submit(): Promise<void>;
  /**
   * Set the target field value, value are not able to be type analysed.
   */
  set(name: Path<Objective>, value: any): void;

  action: (formValue: Objective) => Promise<void>;

  fields: FieldDescriptor<Objective, any, any>;
};

// const ComputedSymbol = Symbol('ComputedSymbol');

const describeForm = <Objective>(
  cb: (payload: {
    describeGroup: () => any;
    describeField: <PV extends Path<Objective>, Type extends keyof FieldTypes>(
      f: FieldDescriptor<Objective, PV, Type>,
    ) => FieldDescriptor<Objective, PV, Type>;
  }) => void,
) => {};

const describeField = <Objective>() => {};

const form = describeForm<IForm15Pro>(({ describeField }) => {
  describeField({
    initialValue: [null, null],
    name: 'duration',
    type: 'hidden',
  });

  describeField({
    initialValue: 'Good',
    name: 'usage',
    type: 'hidden',
  });

  describeField({
    initialValue: 0,
    name: 'rating',
    rule: 'string!',
    type: 'hidden',
  });

  describeField({
    initialValue: '1',
    name: 'billingRefs.0',
    rule: 'string!',
    type: 'radio',
    props: {
      options: computed(() => ['1']),
    },
  });

  describeField({
    initialValue: ['1', '2', '3'],
    name: 'otherDescritionPro.billingRefs',
    rule: ['array!', [1, 3]],
    type: 'radio',
    props: {
      options: computed(() => ['1']),
    },
  });
});
