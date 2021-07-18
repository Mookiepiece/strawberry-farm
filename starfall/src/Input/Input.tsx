import React from 'react';

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
} & Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'>;

const Input: React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLInputElement> & InputProps
> = React.forwardRef(({ value, onChange, ...rest }, ref) => {
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
