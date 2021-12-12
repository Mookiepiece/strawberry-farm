/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext, useImperativeHandle } from 'react';
import type { RuleItem } from 'async-validator';
import Button from '../Button';
import { FormContext, FormItemsRegistryProvider, FormValueContext } from './FormContext';
import { FormItem } from './FormItem';
import { FormList } from './FormList';
import type { FormComponentInstance, FormInstance } from './useForm';
import { useForm } from './useForm';

type FormProps<T extends Record<string, any>> = {
  form: FormInstance<T>;
  children: React.ReactNode;
};

const _Form = <T extends Record<string, any>>(
  { form, children }: FormProps<T>,
  ref: React.ForwardedRef<FormComponentInstance>
): // ref: React.ForwardedRef<FormComponentInstance>
React.ReactElement => {
  const useWatch = form.useWatch;
  const initialValue = form.initialValue;
  const formContextValue = form.formContextValue;
  const { formMitt } = formContextValue;

  const [state, setState] = useState(initialValue);
  const value = useWatch(state);

  useImperativeHandle(form.formRef, () => ({
    get value() {
      return value;
    },
    setState: setState as React.Dispatch<React.SetStateAction<Record<string, any>>>,
    get rawValue() {
      return state;
    },
  }));

  const formValueContextValue = value;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.submit();
      }}
      onReset={e => {
        e.preventDefault();
        form.reset();
      }}
    >
      <FormItemsRegistryProvider itemsRef={form.items}>
        <FormContext.Provider value={formContextValue}>
          <FormValueContext.Provider value={formValueContextValue}>
            {children}
          </FormValueContext.Provider>
        </FormContext.Provider>
      </FormItemsRegistryProvider>
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

const defineRules = <T extends Record<string, RuleItem | RuleItem[] | undefined>>(a: T) => a;

const Form: (<T extends Record<string, any>>(
  props: FormProps<T> & React.RefAttributes<unknown>
) => React.ReactElement) & {
  Item: typeof FormItem;
  List: typeof FormList;
  SubmitButton: typeof Button;

  useForm: typeof useForm;

  defineRules: typeof defineRules;
} = Object.assign(_Form, {
  Item: FormItem,
  List: FormList,
  SubmitButton: FormSubmitButton,

  useForm,

  defineRules,
}) as any;

export default Form;
