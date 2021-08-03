import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncValidator from 'async-validator';
import type { RuleItem } from 'async-validator';
import { useEventCallback } from '@mookiepiece/starfall-utils';
import { FormContext } from './FormContext';
import clsx from 'clsx';
import { getProp, UNDEFINED_VALUE } from './getProp';
import { useMountedState } from 'react-use';

export type ValidateStatus = {
  state: 'error' | '';
  message: string;
};

// error messages has a exit animation so we dont reset messages
export type ValidateStatusParam =
  | ''
  | {
      state: 'error';
      message: string;
    };

export type FormItemFnChildren<T> = (props: {
  value: T;
  onChange: (value: T) => void;
  withLabel: (children: React.ReactNode) => React.ReactNode;
  validate: (method: 'change' | 'force') => Promise<void>;
  validateStatus: ValidateStatus;
  setValidateStatus: (s: ValidateStatusParam) => void;
  cancelValidate: () => void;
}) => React.ReactNode;

export type FormItemProps<T> = {
  name: string;
  label?: string;
  rules?: RuleItem | RuleItem[];
  children: React.ReactElement | FormItemFnChildren<T>;
};

const FormItem = <T extends any = any>({
  rules = [],
  label,
  name,
  children,
}: FormItemProps<T>): React.ReactElement => {
  const { register, unregister, formMitt } = useContext(FormContext);
  const mounted = useMountedState();
  const [state, setState] = useState<{
    model: T;
    validateStatus: ValidateStatus;
  }>({
    model: UNDEFINED_VALUE as T,
    validateStatus: {
      state: '',
      message: '',
    },
  });
  const validating = useRef(false);

  const value = state.model;
  const validateStatus = state.validateStatus;

  const pathes = useMemo(() => {
    return name.replace(/\[(\w+)\]/g, '.$1').split('.');
  }, [name]);

  const setValidateStatus = useCallback(
    (validateStatusParam: ValidateStatusParam) => {
      if (mounted())
        if (typeof validateStatusParam === 'string') {
          setState(state => {
            if (state.validateStatus.state === '') {
              return state;
            }
            return {
              ...state,
              validateStatus: {
                state: validateStatusParam,
                message: state.validateStatus.message,
              },
            };
          });
        } else {
          setState(state => ({
            ...state,
            validateStatus: validateStatusParam,
          }));
        }
    },
    [mounted]
  );

  const validateKey = useRef(0);
  const nextTickToValidate = useRef(false);
  const cancelValidate = useCallback(() => ++validateKey.current, []);

  const validate = useEventCallback(async (method: 'change' | 'force') => {
    const fixedRules = Array.isArray(rules) ? rules : [rules];
    if (!fixedRules.length) {
      return;
    }
    const validator = new AsyncValidator({ [name]: fixedRules });

    if (method === 'change' && validating.current) {
      nextTickToValidate.current = true;
      return;
    }
    if (method === 'force') {
      nextTickToValidate.current = false;
    }
    const key = ++validateKey.current;

    try {
      validating.current = true;
      await validator.validate({ [name]: value }, { firstFields: true });
      if (key === validateKey.current) {
        setValidateStatus('');
      }
    } catch (e) {
      if (key === validateKey.current) {
        setValidateStatus({
          state: 'error',
          message: e.errors[0].message,
        });
        if (method === 'force') throw e;
      }
    } finally {
      // consume validate callbacks when this validation finished
      // this is not duplicated with the useEffect below, because we may
      // not call setState to trigger rerender in setValidateStatus.
      if (key === validateKey.current) {
        validating.current = false;
        if (nextTickToValidate.current === true) {
          nextTickToValidate.current = false;
          validate('change');
        }
      }
    }
  });

  useEffect(() => {
    const handleUpdate = ({
      value: formValue,
      pathes: triggerPathes,
    }: {
      value: unknown;
      pathes: string[];
    }): void => {
      const newValue = getProp(formValue as Record<string, unknown>, pathes) as T;
      // immutablility makes all changes will change the root object
      // if this is a `parent form item` and has `child form items`
      // and the child form items changed their `deep data`
      // we don't re-render this item, it will
      // rerender automatically as long as parent rerenders
      // because we are using `render props` to render child base on parent
      // in some edge case we want get the child data and display them in parent item
      // we passing the parent's onChange to child item instead of it's own
      if (triggerPathes.length <= pathes.length) {
        if (state.model !== newValue) {
          // A setState may bring forward the excution of useEffect, make sure ref mutations is before setState
          // this happeneds when child component is class component and call this.setState in componentDidUpdate
          // lead to a sync flush of all useEffects
          // see https://zhuanlan.zhihu.com/p/395250453
          nextTickToValidate.current = true;
          // state has been updated, cause a rerender in which we validate the new value in useEffect.
          setState(state => ({
            ...state,
            model: newValue,
          }));
        }
      }
    };
    formMitt.on('UPDATE', handleUpdate);
    return () => {
      formMitt.off('UPDATE', handleUpdate);
    };
  }, [formMitt, pathes, state.model]);

  useEffect(() => {
    if (nextTickToValidate.current === true) {
      nextTickToValidate.current = false;
      validate('change');
    }
  });

  const reset = useCallback(
    (value: T) => {
      setValidateStatus('');
      cancelValidate();
      setState(state => ({
        ...state,
        model: value,
      }));
    },
    [cancelValidate, setValidateStatus]
  );

  useEffect(() => {
    const v = {
      name,
      pathes,
      validate: () => validate('force'),
      setValidateStatus,
      cancelValidate,
      reset,
    };
    register(v);

    return () => unregister(v);
  }, [register, unregister, name, validate, cancelValidate, setValidateStatus, pathes, reset]);

  const onChange = useCallback(
    value => {
      formMitt.emit('CHANGE', { pathes, value });
    },
    [formMitt, pathes]
  );

  const asterisk =
    !!(Array.isArray(rules) ? rules : [rules]).find(r => r.required) && 'st-label-asterisk';

  const errorMessageNode = validateStatus.message ? (
    <span className="st-error-message">{validateStatus.message}</span>
  ) : (
    <span className="st-error-message">&nbsp;</span>
  );

  const withLabel = (children: React.ReactNode) =>
    label ? (
      <div
        className={clsx('st-form-item', validateStatus.state === 'error' && 'st-form-item--error')}
      >
        <label>
          <span className={clsx('st-label', asterisk)}>{label}</span>
          {children}
        </label>
        {errorMessageNode}
      </div>
    ) : (
      <>{children}</>
    );

  if (value === UNDEFINED_VALUE) {
    return <></>;
  }

  let childNode: React.ReactNode | null = null;
  if (React.isValidElement(children)) {
    if ('value' in children.props) {
      throw new Error('[ST Form.Item] remove prop `value` from input inside a form item');
    }
    if ('onChange' in children.props) {
      throw new Error('[ST Form.Item] remove prop `onChange` from input inside a form item');
    }

    childNode = withLabel(React.cloneElement(children, { ...children.props, value, onChange }));
  } else if (typeof children === 'function') {
    childNode = children({
      value,
      onChange,
      validate,
      withLabel,
      validateStatus,
      setValidateStatus,
      cancelValidate,
    });
  }

  return <>{childNode}</>;
};

export { FormItem };
