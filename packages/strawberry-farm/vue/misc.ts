export type CommonOptionGroup<T = any> = {
  label?: string;
  options: CommonOption<T>[];
};

export type CommonOptionInput<T = any> =
  | string
  | number
  | boolean
  | null
  | CommonOption<T>;

export type CommonOption<T = any> = {
  label?: string;
  value: any;
  disabled?: boolean;
} & T;

export type CommonOptionsInput<T = any> = (CommonOption<T> | CommonOptionGroup<T>)[];

export type CommonTreeItem = {
  label?: string;
  value: any;
  disabled?: boolean;
  items?: CommonTreeItem[];
};
