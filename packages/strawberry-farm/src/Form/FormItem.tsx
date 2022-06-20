/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import clsx from 'clsx';
import { FormContext, FormValueContext, useFormItemsRegistry } from './FormContext';
import { useSingletonAsyncFn } from '../utils/useSingletonAsyncFn';
import { FormErrorMessage } from './FormErrorMessage';
import { IRuleItem, validator } from '../utils/validator';
import { get as GET, has as HAS } from '../utils/get';

export type FormItemFnChildren<T> = (
  control: {
    value: T;
    onChange: React.Dispatch<React.SetStateAction<T>>;
    ref: React.RefObject<any>;
  },
  meta: {
    validate(method: 'change' | 'force'): Promise<void>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    cancelValidate(): void;
    alert(node?: React.ReactNode): React.ReactNode;
  }
) => React.ReactNode;

export type FormItemProps<T> = {
  name: string;
  label?: string;
  rules?: IRuleItem | IRuleItem[];
  children: React.ReactElement | FormItemFnChildren<T>;
};

export const FormItem = <T extends any = any>({
  rules,
  label,
  name,
  children,
}: FormItemProps<T>): React.ReactElement | null => {
  const form = useContext(FormContext);
  const formValue = useContext(FormValueContext);
  const has = HAS(formValue, name);
  const value = GET(formValue, name);

  const [error, setError] = useState<string | null>(null);
  const [validate, cancelValidate] = useSingletonAsyncFn(async () => {
    if (Array.isArray(rules) ? !rules.length : !rules) return;

    let value = GET(form.value, name);
    if (typeof value === 'string') value = value.trim();

    try {
      await validator.validate(label || name, value, rules);
      setError(null);
    } catch (e: unknown) {
      if (validator.isAsyncValidateError(e)) {
        setError(e.errors[0].message ?? null);
      } else {
        console.error('[strawberry-farm] Unexpected error during validation:', e);
      }
      throw e;
    }
  });

  useUpdateEffect(() => {
    if (form.silent) return;
    validate().catch(() => void 0);
  }, [value]);

  useFormItemsRegistry(
    useMemo(
      () => ({
        name,
        setError,
        validate: () => {
          cancelValidate();
          return validate();
        },
        cancelValidate,
        focus() {
          const control = inputRef.current;
          if (control) {
            if (isInViewport(control)) {
              control.focus();
            } else {
              control.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => control.focus(), 300);
            }
          }
        },
      }),
      [cancelValidate, name, validate]
    )
  );

  const inputRef = useRef<HTMLElement | HTMLInputElement>(null);

  const asterisk =
    (rules ? (Array.isArray(rules) ? rules : [rules]) : []).find(r => r.required) &&
    'sf-label-asterisk';

  return useMemo(() => {
    const render = () => {
      const control = {
        value,
        onChange: (value: React.SetStateAction<T>) => {
          form.setField(name, value);
        },
        ref: inputRef,
      };

      let errorMessageGetterTriggered = false;

      let childNode: React.ReactNode | null = null;
      if (React.isValidElement(children)) {
        if ('value' in children.props) {
          throw new Error('[strawberry-farm] remove prop `value` from input inside a form item');
        }

        childNode = React.cloneElement(children, {
          ...children.props,
          ...control,
          onChange(value: React.SetStateAction<T>) {
            control.onChange(value);
            children.props.onChange?.(value);
          },
        });
      } else if (typeof children === 'function') {
        childNode = children(control, {
          validate,
          error,
          setError,
          cancelValidate,
          get alert() {
            errorMessageGetterTriggered = true;
            return (node: React.ReactNode) => {
              return <FormErrorMessage>{node}</FormErrorMessage>;
            };
          },
        });
      }

      const errorMessageNode = errorMessageGetterTriggered ? null : (
        <FormErrorMessage>{error}</FormErrorMessage>
      );

      return (
        <>
          {childNode}
          {errorMessageNode}
        </>
      );
    };

    return has ? (
      <div className={clsx(typeof error === 'string' && 'st-form-item--error')}>
        <span className={clsx('sf-label', asterisk)}>{label}</span>
        {render()}
      </div>
    ) : null;
  }, [has, error, asterisk, label, value, children, form, name, validate, cancelValidate]);
};

/**
 * @see https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
 */
function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
