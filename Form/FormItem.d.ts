import React from 'react';
import { IRuleItem } from '../shared/validator';
export declare type FormItemFnChildren<T> = (control: {
    value: T;
    onChange: React.Dispatch<React.SetStateAction<T>>;
    ref: React.RefObject<any>;
}, meta: {
    validate(method: 'change' | 'force'): Promise<void>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    cancelValidate(): void;
    alert(node?: React.ReactNode): React.ReactNode;
}) => React.ReactNode;
export declare type FormItemProps<T> = {
    name: string;
    label?: string;
    rules?: IRuleItem | IRuleItem[];
    children: React.ReactElement | FormItemFnChildren<T>;
};
export declare const FormItem: <T extends unknown = any>({ rules, label, name, children, }: FormItemProps<T>) => React.ReactElement | null;
