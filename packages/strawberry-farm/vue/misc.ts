export type CommonOptionGroup = {
  label?: string;
  options: CommonOption[];
};

export type CommonOption =
  | string
  | number
  | boolean
  | null
  | {
      label?: string;
      value: any;
      disabled?: boolean;
    };

export type CommonTreeItem = {
  label?: string;
  value: any;
  disabled?: boolean;
  options?: CommonTreeItem[];
};
