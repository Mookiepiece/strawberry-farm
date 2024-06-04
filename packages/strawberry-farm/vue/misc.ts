export type CommonOption<T = undefined> = {
  label?: string;
  value: any;
  meta?: T;
  disabled?: boolean;
};

export type CommonOptionInput<T = undefined> =
  | string
  | number
  | boolean
  | null
  | undefined
  | CommonOption<T>;

export type CommonOptionGroup<T = undefined> = {
  label?: string;
  options: CommonOption<T>[];
};

export type CommonOptionGroupInput<T = undefined> = {
  label?: string;
  options: CommonOptionInput<T>[];
};

export type CommonOptionsInput<T = undefined> = (
  | CommonOptionInput<T>
  | CommonOptionGroupInput<T>
)[];

export type NormalizedCommonOption<T = undefined> = {
  label: any;
  value: any;
  meta?: T;
  disabled: boolean;
  index: number;
  current: boolean;
  selected: boolean;
};

export const flatCommonOptionsInput = <T = undefined>(
  i: CommonOptionsInput<T>,
): CommonOption<T>[] =>
  i
    .flatMap(o =>
      o && typeof o === 'object' && 'options' in o ? o.options : o,
    )
    .map(o =>
      o && typeof o === 'object' && 'value' in o
        ? o
        : { value: o, label: '' + o },
    );

export type TreeNode<T = undefined> = {
  value: any;
  label?: string;
  meta?: T;
  disabled?: boolean;
  open?: boolean;
  children?: boolean | TreeNode<T>[];
};
