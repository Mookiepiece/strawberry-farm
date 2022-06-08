import { useRef, useState } from 'react';
import { CreateFormModel, FormInstance, FormProps } from './formModel';

export const useForm = <T extends Record<string, any>>({
  initialValue,
  FormWatcher,
  action,
}: FormProps<T>): FormInstance<T> => {
  const [form] = useState(() =>
    CreateFormModel({
      initialValue,
      action,
    })
  );
  form.FormWatcher = FormWatcher;
  form.action = action;

  return form;
};
