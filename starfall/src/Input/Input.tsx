import React from 'react';

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  format?: ((value: string) => string) | string;
} & Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'>;

const Input: React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLInputElement> & InputProps
> = React.forwardRef(({ value, onChange, format, ...rest }, ref) => {
  return (
    <input
      className="st-input"
      type="text"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      {...rest}
      ref={ref}
    />
  );
});

export default Input;
