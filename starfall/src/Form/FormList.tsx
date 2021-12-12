/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo, useRef } from 'react';
import { get } from '@mookiepiece/starfall-utils';
import { FormContext } from './FormContext';
import { FormSubscription } from './FormSubscription';

export type FormItemFnChildren<T> = (
  fields: string[],
  meta: {
    add(item: T, index?: number): void;
    remove(index?: number): void;
    swap(index?: number, index2?: number): void;
  }
) => React.ReactNode;

export type FormListProps<T> = {
  name: string;
  children: FormItemFnChildren<T>;
};

export const FormList = <T extends any = any>({
  name: _name,
  children,
}: FormListProps<T>): React.ReactElement => {
  const name = _name + '.length';
  const pathes = useMemo(() => {
    return _name.replace(/\[(\w+)\]/g, '.$1').split('.');
  }, [_name]);

  const { formMitt, formRef } = useContext(FormContext);

  const uuidRef = useRef(0);
  const keysRef = useRef<number[]>([]);

  const render = useMemo(() => {
    const onChange = (value: React.SetStateAction<any[]>) => {
      formMitt.emit('CHANGE', { pathes, value });
    };

    const add = (item: any, index: number = keysRef.current.length) => {
      const arr = [...get(formRef.current.value, pathes)];
      keysRef.current.splice(index, 0, uuidRef.current++);
      arr.splice(index, 0, item);
      onChange(arr);
    };

    const remove = (index: number = keysRef.current.length) => {
      const arr = [...get(formRef.current.value, pathes)];

      keysRef.current.splice(index, 1);
      arr.splice(index, 1);
      onChange(arr);
    };

    const swap = (a: number, b: number) => {
      const arr = [...get(formRef.current.value, pathes)];

      [keysRef.current[b], keysRef.current[a]] = [keysRef.current[a], keysRef.current[b]];
      [arr[a], arr[b]] = [arr[b], arr[a]];
      onChange(arr);
    };

    return (n: number) => {
      const a = Array(n)
        .fill(0)
        .map((_, index) => keysRef.current[index] ?? (keysRef.current[index] = uuidRef.current++))
        .map(String);
      return <>{children(a, { add, remove, swap })}</>;
    };
  }, [children, formMitt, formRef, pathes]);

  return <FormSubscription names={name} render={render} />;
};
