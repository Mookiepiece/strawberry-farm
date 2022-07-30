import React from 'react';
export declare type FormItemFnChildren<T> = (fields: string[], meta: {
    add(item: T, index?: number): void;
    remove(index?: number): void;
    swap(index?: number, index2?: number): void;
}) => React.ReactNode;
export declare type FormListProps<T> = {
    name: string;
    children: FormItemFnChildren<T>;
};
export declare const FormList: <T extends unknown = any>({ name: _name, children, }: FormListProps<T>) => React.ReactElement;
