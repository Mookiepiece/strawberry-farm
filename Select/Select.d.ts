import React from 'react';
declare type SelectProps<T> = {
    value?: T;
    onChange?: (value: T) => void;
    options: {
        value: T;
        label?: string;
    }[];
    renderOptions?: (option: {
        value: T;
        label?: string;
    }, meta: {
        pending?: boolean;
        selected?: boolean;
    }) => React.ReactNode;
    placeholder?: string;
    filterable?: boolean;
    filter?: (option: {
        value: T;
        label?: string;
    }[], query: string) => {
        value: T;
        label?: string;
    }[];
};
declare const Select: <T extends string | number | boolean | Record<string, any> | null | undefined>({ value, onChange, options, renderOptions, placeholder, filterable, filter, }: SelectProps<T>) => React.ReactElement;
export default Select;
