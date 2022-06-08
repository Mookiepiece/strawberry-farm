import React from 'react';
import zustand, { StoreApi, Subscribe, UseBoundStore } from 'zustand';
import { validator } from '../_utils/validator';
import { get as GET, set as SET, unset } from '../_utils/get';
import { FormItemModel } from './FormContext';

export type FormProps<T extends Record<string, any>> = {
  initialValue: T;

  FormWatcher?: (props: { formValue: T; form: FormInstance<T> }) => null;
  action?:
    | ((value: T) => Promise<void> | void)
    | [
        (value: T) => Promise<void> | void,
        (asyncValidationErrors: AggregateError) => Promise<void> | void
      ];
};

export type FormInstance<T extends Record<string, any> = any> = {
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

  useStatusStore: UseBoundStore<
    StoreApi<{
      submitting: boolean;
    }>
  >;

  FormWatcher?: FormProps<T>['FormWatcher'];
  action?: FormProps<T>['action'];
  submit(): void;
  reset(): void;
};

export const CreateFormModel = <T extends Record<string, any>>({
  initialValue: _initialValue,
  action,
}: {
  initialValue: T;
  action: FormProps<T>['action'];
}): FormInstance<T> => {
  let initialValue = _initialValue;
  const store = zustand<T>(() => initialValue);
  const statusStore = zustand(() => ({ submitting: false }));
  const items: React.MutableRefObject<FormItemModel[]> = { current: [] };

  let silent = false;

  const set = (t: React.SetStateAction<T>) => {
    silent = false;
    store.setState(t, true);
  };

  const setSilently = (t: React.SetStateAction<T>) => {
    silent = true;
    store.setState(t, true);
  };

  const _updateField = (name: string, t: React.SetStateAction<any>): T => {
    let fieldValue;
    if (typeof t === 'function') {
      fieldValue = t(GET(store.getState(), name));
    } else {
      fieldValue = t;
    }
    return SET(store.getState(), name, fieldValue);
  };

  const setField = (name: string, t: React.SetStateAction<any>) => {
    set(_updateField(name, t));
  };

  const setFieldSilently = (name: string, t: React.SetStateAction<any>) => {
    setSilently(_updateField(name, t));
  };

  const deleteField = (name: string) => {
    set(unset(store.getState(), name));
  };

  const _validate = async (
    _names?: string | string[]
  ): Promise<
    | { status: 'rejected'; reason: AggregateError; firstItem: FormItemModel }
    | { status: 'fulfilled'; value: T }
  > => {
    const names = _names ? (Array.isArray(_names) ? _names : [_names]) : undefined;

    const value = store.getState();

    const i = items.current.filter(item => !names || names?.includes(item.name));

    const array = await Promise.allSettled(i.map(item => item.validate()));
    if (array.some(i => i.status === 'rejected')) {
      const error = new AggregateError(
        array.filter((i): i is PromiseRejectedResult => i.status === 'rejected').map(i => i.reason)
      );

      const firstItem = i[array.findIndex(i => i.status === 'rejected')];

      return {
        status: 'rejected',
        reason: error,
        firstItem,
      };
    }
    return { status: 'fulfilled', value };
  };

  const validate = async (names?: string | string[]) => {
    const result = await _validate(names);
    if (result.status === 'rejected') {
      throw result.reason;
    }
    return result.value;
  };

  const setError: FormInstance<T>['setError'] = (name, error) => {
    items.current.find(i => i.name === name)?.setError(error);
  };

  const reset = () => {
    setSilently(initialValue);
    items.current.forEach(i => {
      i.cancelValidate();
      i.setError(null);
    });
  };
  const submit = async () => {
    if (statusStore.getState().submitting) return;
    statusStore.setState({ submitting: true });

    const handleSubmit = Array.isArray(action) ? action[0] : action;
    const handleValidateFailed = Array.isArray(action) ? action[1] : undefined;

    try {
      const result = await _validate();
      if (result.status === 'rejected') {
        result.firstItem.focus();
        throw result.reason;
      }
      if (handleSubmit) {
        await handleSubmit(result.value);
      }
    } catch (e) {
      if (e instanceof AggregateError && e.errors.every(i => validator.isAsyncValidateError(i))) {
        handleValidateFailed?.(e);
      } else {
        console.error('[starwberry-farm][Form] Unexpected error during validating / submitting');
        throw e;
      }
    }
    statusStore.setState({ submitting: false });
  };

  return {
    get silent() {
      return silent;
    },
    set,

    get initialValue() {
      return initialValue;
    },
    setInitialValue(i) {
      initialValue = i;
    },
    get value() {
      return store.getState();
    },
    setSilently,
    setField,
    setFieldSilently,
    deleteField,

    items,
    validate,
    setError,

    reset,
    submit,

    subscribe: store.subscribe,

    useStatusStore: statusStore,
    useStore: store,
  };
};
