type IForm15Pro = {
  // name: string;
  // type: 'A' | 'B' | 'C';

  rating: number;
  // temperature: number;

  // usage: 'Good' | 'Bad' | 'other';
  // otherDescrtion?: string;
  // otherDescrtionScreenshot: Blob;

  otherDescritionPro?: {
    // text?: string;
    // screenshot: Blob;
    billings: { name: string; value: number; label?: string }[];
    billingRefs: string[];
  };

  duration: [Date, Date];
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
        : 7
      : B extends `${number}`
        ? T extends Array<infer I>
          ? PathValue<I, B & Path<I>>
          : 2
        : 3
    : P extends keyof T
      ? T[P]
      : P extends `${number}`
        ? T extends Array<infer I>
          ? I
          : 4
        : 5;

// TODO: get out
type CommonChoice =
  | string
  | number
  | boolean
  | null
  | undefined
  | {
      label: string;
      value: any;
      disabled?: boolean;
    };

interface FieldTypes {
  any: undefined;
  text: number | (number | null | undefined)[] | RegExp;
  radio: {
    options: CommonChoice;
  };
}

interface FieldTypeBindings {
  any: any;
  text: string;
  number: number;
  radio: any;
}

type FieldDescriptor<Objective, ObjectivePath extends Path<Objective>, Type> = {
  label: string;
  name: PathValue<Objective, ObjectivePath>;
  type?: keyof FieldTypes;
  props?: keyof FieldTypes;
};

type SFFormModel = {
  focus(name: string): void;
  validate(names?: []): Promise<void>;
  submit(): Promise<void>;
};

const describeForm = <T>() => {};
