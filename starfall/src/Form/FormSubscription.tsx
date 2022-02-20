/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useImperativeHandle, useMemo } from 'react';
import { get, THE_VOID } from '@mookiepiece/starfall-utils';
import { useUpdateEffect } from 'react-use';
import { FormValueContext } from './FormContext';

export type FormSubscriptionInstance = {
  value: any;
};

export const FormSubscription = React.forwardRef(function FormSubscription(
  {
    names: _names,
    render,
    onUpdate,
    greedy,
  }: {
    names: string | string[];
    render: (models: any) => React.ReactNode;
    onUpdate?: (newValue: any) => void;
    greedy?: boolean;
  },
  ref: React.ForwardedRef<FormSubscriptionInstance>
) {
  const names: string[] = Array.isArray(_names) ? _names : [_names];
  const pathes = useMemo(
    () => names.map(name => name.replace(/\[(\w+)\]/g, '.$1').split('.')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    names
  );

  const formValue = useContext(FormValueContext);
  const models: any[] = pathes.map(path => get(formValue, path));

  useImperativeHandle(
    ref,
    () => ({
      value: Array.isArray(_names) ? models : models[0],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    models
  );

  useUpdateEffect(() => {
    onUpdate?.(Array.isArray(_names) ? models : models[0]);
  }, models);

  return (
    <>
      {useMemo(() => {
        if (models.includes(THE_VOID) && !greedy) return null;

        const _models = models.map(i => (i === THE_VOID ? undefined : i));
        return render(Array.isArray(_names) ? _models : _models[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [render, ...models])}
    </>
  );
});
