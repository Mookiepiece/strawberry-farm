/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';
import { useEventCallback } from '@mookiepiece/starfall-utils';

export const useSingletonAsyncFn = <F extends (...args: any[]) => Promise<any>>(
  fn: F
): [F, () => void] => {
  const lock = useRef<Promise<any> | null>(null);
  const key = useRef(0);
  const nextTickToValidate = useRef<Parameters<F> | null>(null);

  const cancel = useCallback(() => {
    ++key.current;
    nextTickToValidate.current = null;
    lock.current = null;
  }, []);

  const excute = useEventCallback(
    async (...args: Parameters<F>): Promise<ReturnType<F>> => {
      if (lock.current) {
        nextTickToValidate.current = args;
        return new Promise<never>(() => {});
      }

      let _key = -1;
      _key = ++key.current;

      const stillAlive = () => _key === key.current;

      try {
        const ans = await (lock.current = fn(...args));

        if (stillAlive()) {
          return ans;
        }
        return new Promise<never>(() => {});
      } catch (e) {
        if (stillAlive()) {
          throw e;
        }
        return new Promise<never>(() => {});
      } finally {
        if (stillAlive()) {
          lock.current = null;
          if (nextTickToValidate.current) {
            const t = nextTickToValidate.current;
            nextTickToValidate.current = null;
            excute(...t);
          }
        }
      }
    }
  );

  return [excute as F, cancel];
};
