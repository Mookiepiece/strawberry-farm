export type CommonOption = {
  label?: string;
  value: any;
  disabled?: boolean;
};

export type CommonOptionInput =
  | string
  | number
  | boolean
  | null
  | undefined
  | CommonOption;

export type CommonOptionGroup = {
  label?: string;
  options: CommonOption[];
};

export type CommonOptionGroupInput = {
  label?: string;
  options: CommonOptionInput[];
};

export type CommonOptionsInput = (CommonOptionInput | CommonOptionGroupInput)[];

export type NormalizedCommonOption = {
  label: any;
  value: any;
  disabled: boolean;
  index: number;
  current: boolean;
  selected: boolean;
};

export const flatCommonOptionsInput = (i: CommonOptionsInput): CommonOption[] =>
  i
    .flatMap(o =>
      o && typeof o === 'object' && 'options' in o ? o.options : o,
    )
    .map(o =>
      o && typeof o === 'object' && 'value' in o
        ? o
        : { value: o, label: '' + o },
    );

export type CommonTreeItem = {
  label?: string;
  value: any;
  disabled?: boolean;
  items?: (CommonTreeItem[]);
  open?: boolean;
};
