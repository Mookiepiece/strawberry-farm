
export type CommonChoice =
  | string
  | number
  | boolean
  | null
  | {
      label?: string;
      value: any;
      disabled?: boolean;
    };