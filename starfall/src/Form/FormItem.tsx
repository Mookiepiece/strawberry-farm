/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import AsyncValidator from 'async-validator';
import type { RuleItem } from 'async-validator';
import { FormContext, useFormItemsRegistry } from './FormContext';
import clsx from 'clsx';
import { useSingletonAsyncFn } from './useSingletonAsyncFn';
import type { FormSubscriptionInstance } from './FormSubscription';
import { FormSubscription } from './FormSubscription';
import { FormErrorMessage } from './FormErrorMessage';

(AsyncValidator as any).warning = () => {};

export type FormItemFnChildren<T> = (
  control: {
    value: T;
    onChange: React.Dispatch<React.SetStateAction<T>>;
    ref: React.RefObject<HTMLElement>;
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
  rules?: RuleItem | RuleItem[];
  children: React.ReactElement | FormItemFnChildren<T>;
};

export const FormItem = <T extends any = any>({
  rules: _rules = [],
  label,
  name,
  children,
}: FormItemProps<T>): React.ReactElement => {
  const { isUntouched, formMitt, silentValues, formRef } = useContext(FormContext);
  const formSubscriptionRef = useRef<FormSubscriptionInstance>(null);

  const rules = useMemo(() => (Array.isArray(_rules) ? _rules : [_rules]), [_rules]);

  const validator = useMemo(() => {
    const rules = Array.isArray(_rules) ? _rules : [_rules];
    if (!rules.length) return;

    const validator = new AsyncValidator({ [label || name]: rules });
    return validator;
  }, [_rules, label, name]);

  const pathes = useMemo(() => {
    return name.replace(/\[(\w+)\]/g, '.$1').split('.');
  }, [name]);

  // validation
  const [error, setError] = useState<string | null>(null);
  const [_validate, cancelValidate] = useSingletonAsyncFn(async () => {
    if (!validator) return;
    if (!formSubscriptionRef.current) return;

    let value = formSubscriptionRef.current.value;

    if (typeof value === 'string') value = value.trim();

    await validator.validate({ [label || name]: value }, { firstFields: true });
  });

  const validate = useCallback(async () => {
    try {
      await _validate();
      setError(null);
    } catch (e: any) {
      setError(e.errors[0].message);
      throw e;
    }
  }, [_validate]);

  const handleUpdate = async () => {
    if (!isUntouched() && !silentValues.current.has(formRef.current.rawValue)) {
      try {
        await validate();
      } catch {
        void 0;
      }
    }
  };
  // //

  useFormItemsRegistry(
    useMemo(
      () => ({
        name,
        pathes,
        setError,
        validate: () => {
          cancelValidate();
          return validate();
        },
        cancelValidate,
        focus() {
          const control = controlRef.current;
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
      [cancelValidate, name, pathes, validate]
    )
  );

  const asterisk =
    !!(Array.isArray(rules) ? rules : [rules]).find(r => r.required) && 'st-label-asterisk';

  const controlRef = useRef<HTMLElement>(null);
  const render = useCallback(
    (model: any) => {
      const control = {
        value: model,
        onChange: (value: React.SetStateAction<T>) => {
          formMitt.emit('CHANGE', { pathes, value });
        },
        ref: controlRef,
      };

      let errorMessageGetterTriggered = false;

      let childNode: React.ReactNode | null = null;
      if (React.isValidElement(children)) {
        if ('value' in children.props) {
          throw new Error('[ST Form.Item] remove prop `value` from input inside a form item');
        }
        if ('onChange' in children.props) {
          throw new Error('[ST Form.Item] remove prop `onChange` from input inside a form item');
        }

        childNode = React.cloneElement(children, { ...children.props, ...control });
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
    },
    [cancelValidate, children, error, formMitt, pathes, validate]
  );

  return (
    <div className={clsx(typeof error === 'string' && 'st-form-item--error')}>
      <span className={clsx('st-label', asterisk)}>{label}</span>
      <FormSubscription
        ref={formSubscriptionRef}
        names={name}
        onUpdate={handleUpdate}
        render={render}
      />
    </div>
  );
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
