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
type PathInternal<T> = T extends Array<infer I>
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

type z = Path<{ a: 1 } | undefined>;

  type V = PathValue<IForm15Pro, 'otherDescritionPro.billingRefs'>;
  type zV = PathValue<IForm15Pro, 'otherDescritionPro.billings'>;
  type zzV = PathValue<IForm15Pro, 'otherDescritionPro.billingRefs.1'>;
  type zV2 = PathValue<IForm15Pro, 'otherDescritionPro.billings.1'>;
  type zVz = PathValue<{ a: string | number }[] | undefined, '1'>;
  type dd = PathValue<IForm15Pro, 'duration'>;
  type ddasd = PathValue<IForm15Pro, 'duration.3'>;
  type ddasdss = PathValue<IForm15Pro, 'billings.1'>;

type v = string[] extends Unpathed ? 1 : 0;
// Potential undefined

const describeForm = <T>() => {};
