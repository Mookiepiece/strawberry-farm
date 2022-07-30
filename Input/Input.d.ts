import React from 'react';
declare type InputProps = {
    value?: string;
    onChange?: (value: string) => void;
    format?: ((value: string) => string) | string;
} & Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'>;
declare const Input: React.ForwardRefExoticComponent<React.RefAttributes<HTMLInputElement> & InputProps>;
export default Input;
