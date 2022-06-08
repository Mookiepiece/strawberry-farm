/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo } from 'react';
import { get, has } from '../_utils/get';
import { FormValueContext } from './FormContext';

export const FormSubscription: React.FC<{
  names: string | string[];
  render: (models: any) => React.ReactNode;
  greedy?: boolean;
}> = ({ names: _names, render, greedy }) => {
  const names: string[] = Array.isArray(_names) ? _names : [_names];
  const pathes = useMemo(
    () => names.map(name => name.replace(/\[(\w+)\]/g, '.$1').split('.')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    names
  );

  const formValue = useContext(FormValueContext);
  const badget: boolean = pathes.some(path => !has(formValue, path));
  const models: any[] = pathes.map(path => get(formValue, path));
  return useMemo(() => {
    if (badget && !greedy) return null;

    return <>{render(Array.isArray(_names) ? models : models[0])}</>;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, badget, ...models]);
};
