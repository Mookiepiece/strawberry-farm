import React, { useContext } from 'react';
import Button from '../Button';
import { IRuleItem } from '../_utils';
import { FormContext, FormItemsRegistryProvider, FormValueContext } from './FormContext';
import { FormItem } from './FormItem';
import { FormList } from './FormList';
import { FormInstance } from './formModel';
import { project } from './project';
import { useForm } from './useForm';

type FormProps<T extends Record<string, any>> = {
  form: FormInstance<T>;
  children: React.ReactNode;
};

const _Form = <T extends Record<string, any>>({
  form,
  children,
}: FormProps<T>): React.ReactElement => {
  const value = form.useStore();

  const FormWatcher = form.FormWatcher;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.submit();
      }}
      onReset={e => {
        e.preventDefault();
        e.stopPropagation();
        form.reset();
      }}
    >
      <FormItemsRegistryProvider itemsRef={form.items}>
        <FormContext.Provider value={form}>
          <FormValueContext.Provider value={value}>
            {children}
            {FormWatcher ? (
              <FormValueContext.Consumer>
                {formValue => <FormWatcher form={form} formValue={formValue as T} />}
              </FormValueContext.Consumer>
            ) : null}
          </FormValueContext.Provider>
        </FormContext.Provider>
      </FormItemsRegistryProvider>
    </form>
  );
};
_Form.displayName = 'Form';

const FormSubmitButton: typeof Button = React.forwardRef(function FormSubmitButton(props, ref) {
  const form = useContext(FormContext);
  const { submitting } = form.useStatusStore();
  return <Button type="submit" {...props} loading={props.loading || submitting} ref={ref} />;
});

const defineRules = <T extends Record<string, IRuleItem | IRuleItem[] | undefined>>(a: T) => a;

const Form: typeof _Form & {
  Item: typeof FormItem;
  List: typeof FormList;
  SubmitButton: typeof Button;

  useForm: typeof useForm;
  FormContext: typeof FormContext;
  FormValueContext: typeof FormValueContext;
  defineRules: typeof defineRules;
  project: typeof project;
} = Object.assign(_Form, {
  Item: FormItem,
  List: FormList,
  SubmitButton: FormSubmitButton,

  useForm,
  defineRules,
  project,
  FormContext,
  FormValueContext,
});

export default Form;
