import React from 'react';
import { IRuleItem } from '../shared';
import { FormInstance } from './formModel';
declare type FormProps<T extends Record<string, any>> = {
    form: FormInstance<T>;
    children: React.ReactNode;
};
declare const Form: {
    <T extends Record<string, any>>({ form, children, }: FormProps<T>): React.ReactElement;
    displayName: string;
} & {
    Item: <T_1 extends unknown = any>({ rules, label, name, children, }: import("./FormItem").FormItemProps<T_1>) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
    List: <T_2 extends unknown = any>({ name: _name, children, }: import("./FormList").FormListProps<T_2>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    SubmitButton: React.ForwardRefExoticComponent<React.RefAttributes<HTMLButtonElement> & {
        type?: "button" | "reset" | "submit" | undefined;
        height?: string | number | undefined;
        primary?: boolean | undefined;
        textual?: boolean | undefined;
        block?: boolean | undefined;
        solid?: boolean | undefined;
        loading?: boolean | undefined;
        haircut?: boolean | undefined;
    } & React.HTMLProps<HTMLButtonElement>>;
    useForm: <T_3 extends Record<string, any>>({ initialValue, FormWatcher, action, }: import("./formModel").FormProps<T_3>) => FormInstance<T_3>;
    defineRules: <T_4 extends Record<string, IRuleItem | IRuleItem[] | undefined>>(a: T_4) => T_4;
    project: <T_5 extends string, P extends T_5 | T_5[]>(name: P, render: (model: any) => React.ReactNode, meta?: {
        greedy?: boolean | undefined;
    } | undefined) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    FormContext: React.Context<FormInstance<any>>;
    FormValueContext: React.Context<Record<string, any>>;
};
export default Form;
