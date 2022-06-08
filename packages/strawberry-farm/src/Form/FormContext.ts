import React from 'react';
import { createRegistry } from '../_utils/createRegistry';
import { FormInstance } from './formModel';

export type FormItemModel = {
  name: string;
  setError: (error: string | null) => void;
  validate: () => Promise<void>;
  cancelValidate: () => void;
  focus: () => void;
};

export const [FormItemsRegistryProvider, useFormItemsRegistry] = createRegistry<FormItemModel>();

export const FormContext = React.createContext<FormInstance>(undefined as any);
FormContext.displayName = 'FormContext';

export const FormValueContext = React.createContext<Record<string, any>>(undefined as any);
FormValueContext.displayName = 'FormValueContext';
