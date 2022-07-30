import React from 'react';
import { FormInstance } from './formModel';
export declare type FormItemModel = {
    name: string;
    setError: (error: string | null) => void;
    validate: () => Promise<void>;
    cancelValidate: () => void;
    focus: () => void;
};
export declare const FormItemsRegistryProvider: React.FC<{
    itemsRef: React.MutableRefObject<FormItemModel[]>;
    children?: React.ReactNode;
}>, useFormItemsRegistry: (i: FormItemModel | undefined) => void;
export declare const FormContext: React.Context<FormInstance<any>>;
export declare const FormValueContext: React.Context<Record<string, any>>;
