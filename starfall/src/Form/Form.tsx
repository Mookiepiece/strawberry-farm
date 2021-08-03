import { ErrorList } from 'async-validator';
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  FormEvent,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useMount } from 'react-use';
import { Mitt } from '@mookiepiece/starfall-utils';
import type { Emitter } from '@mookiepiece/starfall-utils';
import { useEventCallback } from '@mookiepiece/starfall-utils';
import Button from '../Button';
import { FormContext, FormItemsRegisterProps } from './FormContext';
import { FormItem, ValidateStatusParam } from './FormItem';
import { getProp, setProp } from './getProp';

type FormInstance<T extends Record<string, unknown>> = {
  setInitialValue: (initialValue: T) => void;
  validate: (names?: string[]) => Promise<T>;
  reset: (names?: string[]) => void;
  set: (callback: (value: T) => T) => void;
  value: T;
  setValidateStatus: (name: string, validateStatus: ValidateStatusParam) => void;
};

export type FormMitt = Emitter<{
  CHANGE: { pathes: string[]; value: any };
  UPDATE: { value: unknown; pathes: string[] };
  SUBMITTING_CHANGE: boolean;
}>;

type FormProps<T extends Record<string, unknown>> = {
  initialValue: T;
  children?: React.ReactNode;
  /** provide api and indicates the Form do internal submit, pick one from `action` and `onSubmit` */
  action?:
    | ((value: T) => Promise<void> | void)
    | [(value: T) => Promise<void> | void, (errors: ErrorList) => Promise<void> | void];
  /** should validate manually if using form in this way, pick one from `action` and `onSubmit` */
  onSubmit?: () => void;
};

const _Form = <T extends Record<string, unknown>>(props: FormProps<T>, ref: React.Ref<unknown>) => {
  if ((props.action && props.onSubmit) || (!props.action && !props.onSubmit)) {
    throw new Error('[ST form] prop `action` and `onSubmit` conflicts or not be provided');
  }

  const initialValue = useRef(props.initialValue);
  const valueRef = useRef<T>(initialValue.current);

  const [formMitt] = useState(() => Mitt() as FormMitt);

  // using Map will make things complicated because map could not support `multiple same name` without using array
  const items = useRef<FormItemsRegisterProps[]>([]);

  useMount(() => {
    formMitt.on('CHANGE', ({ pathes, value: propValue }) => {
      valueRef.current = setProp<T>(valueRef.current, pathes, propValue);
      formMitt.emit('UPDATE', { value: valueRef.current, pathes });
    });
  });

  const register = useEventCallback((i: FormItemsRegisterProps) => {
    items.current = [...items.current, i];
    i.reset(getProp(valueRef.current, i.pathes));
  });
  const unregister = useCallback(i => {
    const index = items.current.findIndex(k => k === i);
    if (index !== -1) {
      items.current = [...items.current.slice(0, index), ...items.current.slice(index + 1)];
    }
  }, []);

  const validate = useEventCallback(
    async (names: string[] = []): Promise<T> => {
      const i = names.length
        ? items.current.filter(({ name }) => names.includes(name))
        : items.current;

      let t = 0;
      const errors: ErrorList = [];
      const value = valueRef.current;
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
          return;
        };
        i.map(item => item.validate().then(() => callback(), callback));
      });
    }
  );

  const reset = useEventCallback(async (names: string[] = []) => {
    const i = names.length
      ? items.current.filter(({ name }) => names.includes(name))
      : items.current;
    i.forEach(item => {
      const i = getProp(initialValue.current, item.pathes);
      item.reset(i);
      valueRef.current = setProp(valueRef.current, item.pathes, i);
    });
  });

  const setValidateStatus = useCallback((name: string, validateStatus: ValidateStatusParam) => {
    const i = items.current.filter(({ name: _ }) => _ === name);
    i.forEach(item => {
      item.setValidateStatus(validateStatus);
    });
  }, []);

  const set = useCallback(
    (callback: (value: T) => T) => {
      formMitt.emit('UPDATE', {
        value: (valueRef.current = callback(valueRef.current)),
        pathes: [],
      });
    },
    [formMitt]
  );

  const formContextValue = useMemo(
    () => ({
      register,
      unregister,
      formMitt,
    }),
    [register, unregister, formMitt]
  );

  useImperativeHandle(
    ref,
    (): FormInstance<T> => ({
      setInitialValue(v) {
        initialValue.current = v;
      },
      validate,
      setValidateStatus,
      set,
      get value() {
        return valueRef.current;
      },
      reset,
    }),
    [validate, setValidateStatus, set, reset]
  );

  const submitting = useRef(false);
  const handleSubmit = useEventCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (props.action) {
      if (submitting.current) return;
      // internal submit
      const [successAction, failedAction] = Array.isArray(props.action)
        ? props.action
        : [props.action, () => {}];

      formMitt.emit('SUBMITTING_CHANGE', (submitting.current = true));
      const v = valueRef.current;
      try {
        await validate();

        try {
          await successAction(v);
        } catch (_) {
          void 0;
        }
      } catch (e) {
        failedAction(e);
      } finally {
        formMitt.emit('SUBMITTING_CHANGE', (submitting.current = false));
      }
    } else {
      // external submit
      props.onSubmit?.();
    }
  });

  return (
    <form
      onSubmit={handleSubmit}
      onReset={(e: FormEvent) => {
        e.preventDefault();
        reset();
      }}
    >
      <FormContext.Provider value={formContextValue}>{props.children}</FormContext.Provider>
    </form>
  );
};
_Form.displayName = 'Form';

const FormSubmitButton: typeof Button = React.forwardRef((props, ref) => {
  const { formMitt } = useContext(FormContext);

  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    formMitt.on('SUBMITTING_CHANGE', setSubmitting);
    return () => formMitt.off('SUBMITTING_CHANGE', setSubmitting);
  }, [formMitt]);

  return <Button {...props} type="submit" loading={props.loading || submitting} ref={ref} />;
});

const Form: (<T extends Record<string, unknown>>(
  props: FormProps<T> & React.RefAttributes<unknown>
) => React.ReactElement) & {
  Item: typeof FormItem;
  SubmitButton: typeof Button;
  useRef: <T extends Record<string, unknown>>() => React.RefObject<FormInstance<T>>;
} = Object.assign(React.forwardRef(_Form), {
  Item: FormItem,
  SubmitButton: FormSubmitButton,
  useRef: <T extends Record<string, unknown>>() => React.useRef<FormInstance<T>>(null),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

export default Form;
