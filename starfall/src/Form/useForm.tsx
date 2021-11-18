import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { FormContextValue, FormItemsRegisterProps } from './FormContext';
import { Mitt, useEventCallback } from '@mookiepiece/starfall-utils';
import type { ErrorList } from 'async-validator';
import type { FormMitt } from './FormContext';
import { project } from './project';
import { recursiveTrim } from './recursiveTrim';

export type FormInstance<T extends Record<string, unknown>> = {
  set: React.Dispatch<React.SetStateAction<T>>;
  setInitialValue: React.Dispatch<React.SetStateAction<T>>;
  validate: (names?: string[]) => Promise<T>;
  value: T;
  useWatch(formValue: T): T;
  formRef: React.MutableRefObject<FormComponentInstance>;
  initialValue: T;
  formContextValue: FormContextValue;
  submit(): void;
  reset(names?: string[]): void;
  setError(name: string, error: string | null): void;
  isUntouched(): boolean;
  isTouched(): boolean;
  items: React.MutableRefObject<FormItemsRegisterProps[]>;
  project: typeof project;
};

export type FormComponentInstance = {
  value: any;
  rawValue: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useWatchDefault = (v: any) => v;

export const useForm = <T extends Record<string, any>>({
  initialValue: _initialValue,
  useWatch: _useWatch = useWatchDefault,
  action: action = () => Promise.resolve(),
}: {
  initialValue: T;
  useWatch?: (formValue: T) => T;
  action?:
    | ((value: T) => Promise<void> | void)
    | [(value: T) => Promise<void> | void, (errors: ErrorList) => Promise<void> | void];
}): FormInstance<T> => {
  // Freeze initial value
  const [initialValue, setInitialValue] = useState(_initialValue);
  const [useWatch] = useState(() => _useWatch);
  // //

  const formRef = useRef<FormComponentInstance>({
    value: initialValue,
    rawValue: initialValue,
  });

  //  Form Context\
  const isUntouched = useCallback(() => {
    return formRef.current.rawValue === initialValue;
  }, [initialValue]);

  const [formMitt] = useState<FormMitt>(Mitt);

  const items = useRef<FormItemsRegisterProps[]>([]);

  const formContextValue = useMemo(
    () => ({
      isUntouched,
      formMitt,
      formRef,
    }),
    [isUntouched, formMitt]
  );
  // //

  const validate = useEventCallback(
    async (names: string[] = []): Promise<T> => {
      const i = names.length
        ? items.current.filter(({ name }) => names.includes(name))
        : items.current;

      let t = 0;
      const errors: ErrorList = [];
      const value = formRef.current.value;
      return new Promise((resolve, reject) => {
        const callback = (e?: { errors: ErrorList }) => {
          if (e) {
            errors.push(...e.errors);
          }
          if (++t === i.length) {
            if (errors.length) {
              reject(errors);
            }
            resolve(value);
          }
        };
        i.map(item => item.validate().then(() => callback(), callback));
      });
    }
  );

  const submitting = useRef(false);
  const submit = useEventCallback(async () => {
    if (action) {
      if (submitting.current) return;
      // internal submit
      const [successAction, failedAction] = Array.isArray(action) ? action : [action, () => {}];

      formMitt.emit('SUBMITTING_CHANGE', (submitting.current = true));
      try {
        const v = await validate();

        try {
          await successAction(recursiveTrim(v));
        } catch (_) {
          void 0;
        }
      } catch (e) {
        failedAction(e as any);
      } finally {
        formMitt.emit('SUBMITTING_CHANGE', (submitting.current = false));
      }
    }
  });

  const reset = useEventCallback(async () => {
    formMitt.emit('CHANGE', { pathes: [], value: initialValue });
    items.current.forEach(({ cancelValidate, setError }) => {
      cancelValidate();
      setError(null);
    });
  });

  const setError = useCallback((name: string, error: string | null) => {
    const i = items.current.filter(({ name: _ }) => _ === name);
    i.forEach(item => {
      item.setError(error);
    });
  }, []);

  const set = useCallback(
    (value: React.SetStateAction<T>) => {
      formMitt.emit('CHANGE', {
        pathes: [],
        value,
      });
    },
    [formMitt]
  );

  return useMemo(
    () => ({
      get value() {
        return formRef.current.value;
      },
      isUntouched,
      isTouched() {
        return !isUntouched();
      },
      items,

      setInitialValue,
      validate,
      useWatch,
      formRef,
      initialValue,
      formContextValue,
      submit,
      set,
      reset,
      setError,

      project,
    }),
    [isUntouched, validate, useWatch, initialValue, formContextValue, submit, set, reset, setError]
  );
};
