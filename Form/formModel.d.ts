import React from 'react';
import { StoreApi, Subscribe, UseBoundStore } from 'zustand';
import { FormItemModel } from './FormContext';
export declare type FormProps<T extends Record<string, any>> = {
    initialValue: T;
    FormWatcher?: (props: {
        formValue: T;
        form: FormInstance<T>;
    }) => null;
    action?: ((value: T) => Promise<void> | void) | [
        (value: T) => Promise<void> | void,
        (asyncValidationErrors: AggregateError) => Promise<void> | void
    ];
};
export declare type FormInstance<T extends Record<string, any> = any> = {
    readonly initialValue: T;
    setInitialValue(initialValue: T): void;
    readonly value: T;
    set: React.Dispatch<React.SetStateAction<T>>;
    setSilently: React.Dispatch<React.SetStateAction<T>>;
    setField<F = any>(name: string, action: React.SetStateAction<F>): void;
    setFieldSilently<F = any>(name: string, action: React.SetStateAction<F>): void;
    deleteField(name: string): void;
    /**
     * Mutable, a flag that disable validations.
     */
    silent: boolean;
    subscribe: Subscribe<T>;
    useStore: UseBoundStore<StoreApi<T>>;
    items: React.MutableRefObject<FormItemModel[]>;
    /**
     * @throws AggregateError which contains ValidateError[]
     */
    validate(names?: string | string[]): Promise<T>;
    setError(name: string, error: string | null): void;
    useStatusStore: UseBoundStore<StoreApi<{
        submitting: boolean;
    }>>;
    FormWatcher?: FormProps<T>['FormWatcher'];
    action?: FormProps<T>['action'];
    submit(): void;
    reset(): void;
};
export declare const CreateFormModel: <T extends Record<string, any>>({ initialValue: _initialValue, action, }: {
    initialValue: T;
    action: [(value: T) => Promise<void> | void, (asyncValidationErrors: AggregateError) => Promise<void> | void] | ((value: T) => Promise<void> | void) | undefined;
}) => FormInstance<T>;
