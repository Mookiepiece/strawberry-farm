/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { FormContextValue, FormItemsRegisterProps } from './FormContext';
import { Mitt, useEventCallback, get, set as SET, THE_VOID } from '@mookiepiece/starfall-utils';
import type { ErrorList } from 'async-validator';
import type { FormMitt } from './FormContext';
import { project } from './project';
import { recursiveTrim } from './recursiveTrim';

export type FormInstance<T extends Record<string, unknown>> = {
  set: React.Dispatch<React.SetStateAction<T>>;
  setSilently: React.Dispatch<React.SetStateAction<T>>;
  setField(pathOrName: string | string[], value: React.SetStateAction<T>): void;
  setFieldSilently(pathOrName: string | string[], value: React.SetStateAction<T>): void;
  setInitialValue(initialValue: T): void;
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
  setState: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  rawValue: any;
};

const useWatchDefault = (v: any) => v;

export const useForm = <T extends Record<string, any>>({
  initialValue: _initialValue,
  useWatch: _useWatch = useWatchDefault,
  action = () => Promise.resolve(),
}: {
  initialValue: T;
  useWatch?: (formValue: T) => T;
  action?:
    | ((value: T) => Promise<void> | void)
    | [
        (value: T) => Promise<void> | void,
        (error: { firstItem: FormItemsRegisterProps; errors: ErrorList }) => Promise<void> | void
      ];
}): FormInstance<T> => {
  // Freeze initial value
  const initialValueRef = useRef<T>(_initialValue);
  const [useWatch] = useState(() => _useWatch);
  // //

  const silentValues = useRef<Set<any>>(new Set());

  const formRef = useRef<FormComponentInstance>({
    value: initialValueRef.current,
    setState() {},
    rawValue: initialValueRef.current,
  });

  //  Form Context\
  const isUntouched = useCallback(() => {
    return formRef.current.rawValue === initialValueRef.current;
  }, []);

  const [formMitt] = useState<FormMitt>(() => {
    const formMitt: FormMitt = Mitt();
    const cb = ({
      pathes,
      value,
      silent,
    }: {
      pathes: string[];
      value: React.SetStateAction<any>;
      silent?: boolean;
    }) => {
      const resultHandler = (result: any) => {
        if (silent) {
          silentValues.current.add(result);
        } else {
          silentValues.current.clear();
        }
        return result;
      };

      if (typeof value === 'function') {
        formRef.current.setState(state => {
          const prev = get(state, pathes);
          const result = SET(state, pathes, value(prev));
          return resultHandler(result);
        });
      } else {
        if (!pathes.length) {
          const result = value;
          formRef.current.setState(resultHandler(result));
        } else if (value === THE_VOID) {
          formRef.current.setState(state => {
            const result = SET(state, pathes, value);
            const parent = get(result, pathes.slice(0, -1));
            delete parent[pathes[pathes.length - 1]];
            return resultHandler(result);
          });
        } else {
          formRef.current.setState(state => {
            const result = SET(state, pathes, value);
            return resultHandler(result);
          });
        }
      }
    };
    formMitt.on('CHANGE', cb);
    return formMitt;
  });

  const items = useRef<FormItemsRegisterProps[]>([]);

  const formContextValue = useMemo(
    () => ({
      isUntouched,
      formMitt,
      formRef,
      silentValues,
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

      const errorItems: FormItemsRegisterProps[] = [];
      const errors: ErrorList = [];
      const value = formRef.current.value;
      return new Promise((resolve, reject) => {
        const callback = ({
          item,
          error,
        }: {
          item: FormItemsRegisterProps;
          error?: { errors: ErrorList };
        }) => {
          if (error) {
            errorItems.push(item);
            errors.push(...error.errors);
          }
          if (++t === i.length) {
            if (errors.length) {
              reject({
                firstItem: errorItems[0],
                errors,
              });
            }
            resolve(value);
          }
        };
        i.map(item =>
          item.validate().then(
            () =>
              callback({
                item,
              }),
            error =>
              callback({
                item,
                error,
              })
          )
        );
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
      } catch (e: any) {
        if ('firstItem' in e) {
          e.firstItem.focus();
          failedAction(e as any);
        }
      } finally {
        formMitt.emit('SUBMITTING_CHANGE', (submitting.current = false));
      }
    }
  });

  const reset = useEventCallback(async () => {
    formMitt.emit('CHANGE', { pathes: [], value: initialValueRef.current });
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

  const setSilently = useCallback(
    (value: React.SetStateAction<T>) => {
      formMitt.emit('CHANGE', {
        pathes: [],
        value,
        silent: true,
      });
    },
    [formMitt]
  );

  const setField = useCallback(
    (pathOrName: string | string[], value: React.SetStateAction<any>) => {
      formMitt.emit('CHANGE', {
        pathes: Array.isArray(pathOrName)
          ? pathOrName
          : pathOrName.replace(/\[(\w+)\]/g, '.$1').split('.'),
        value,
      });
    },
    [formMitt]
  );

  const setFieldSilently = useCallback(
    (pathOrName: string | string[], value: React.SetStateAction<any>) => {
      formMitt.emit('CHANGE', {
        pathes: Array.isArray(pathOrName)
          ? pathOrName
          : pathOrName.replace(/\[(\w+)\]/g, '.$1').split('.'),
        value,
        silent: true,
      });
    },
    [formMitt]
  );

  return useMemo(
    () => ({
      set,
      setSilently,
      setField,
      setFieldSilently,

      get value() {
        return formRef.current.value;
      },
      isUntouched,
      isTouched() {
        return !isUntouched();
      },
      items,

      get initialValue() {
        return initialValueRef.current;
      },
      setInitialValue(v) {
        initialValueRef.current = v;
      },
      validate,
      useWatch,
      formRef,
      formContextValue,
      submit,
      reset,
      setError,

      project,
    }),
    [
      set,
      setSilently,
      setField,
      setFieldSilently,
      isUntouched,
      validate,
      useWatch,
      formContextValue,
      submit,
      reset,
      setError,
    ]
  );
};
