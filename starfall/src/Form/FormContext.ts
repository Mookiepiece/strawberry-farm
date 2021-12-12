/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Emitter } from '@mookiepiece/starfall-utils';
import { createRegistry } from '@mookiepiece/starfall-utils';
import React from 'react';
import type { FormComponentInstance } from './useForm';

export type FormMitt = Emitter<{
  CHANGE: { pathes: string[]; value: React.SetStateAction<any>; silent?: boolean };
  UPDATE: { value: unknown };
  SUBMITTING_CHANGE: boolean;
}>;

export type FormItemsRegisterProps = {
  name: string;
  pathes: string[];
  setError: (error: string | null) => void;
  validate: () => Promise<void>;
  cancelValidate: () => void;
  focus(): void;
};

export const [
  FormItemsRegistryProvider,
  useFormItemsRegistry,
] = createRegistry<FormItemsRegisterProps>();

export type FormContextValue = {
  isUntouched(): boolean;
  formMitt: FormMitt;
  formRef: React.MutableRefObject<FormComponentInstance>;
  silentValues: React.MutableRefObject<Set<any>>;
};

export const FormContext = React.createContext<FormContextValue>({
  isUntouched: () => false,
  formMitt: { on() {}, off() {}, emit() {} },
  formRef: {} as any,
  silentValues: { current: new Set() },
});

export const FormValueContext = React.createContext<any>({});
