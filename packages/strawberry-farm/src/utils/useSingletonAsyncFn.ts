/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';
import { useEventCallback } from './useEventCallback';

export const useSingletonAsyncFn = <F extends (...args: any[]) => Promise<any>>(
  fn: F
): [F, () => void] => {
  const lock = useRef<Promise<any> | null>(null);
  const key = useRef(0);
  const nextTask = useRef<{
    args: Parameters<F>;
    listener: (v: Promise<ReturnType<F>>) => void;
  } | null>(null);

  const cancel = useCallback(() => {
    ++key.current;
    nextTask.current = null;
    lock.current = null;
  }, []);

  const excute = useEventCallback(async (...args: Parameters<F>): Promise<ReturnType<F>> => {
    if (lock.current) {
      return new Promise<F>((resolve, reject) => {
        nextTask.current = {
          args,
          listener: p => p.then(resolve).catch(reject),
        };
      });
    }

    const _key = ++key.current;
    const stillAlive = () => _key === key.current;

    try {
      const ans = await (lock.current = fn(...args));
      if (stillAlive()) return ans;
      return new Promise<never>(() => {});
    } catch (e) {
      if (stillAlive()) throw e;
      return new Promise<never>(() => {});
    } finally {
      if (stillAlive()) {
        lock.current = null;
        if (nextTask.current) {
          const { args, listener } = nextTask.current;
          nextTask.current = null;
          listener(excute(...args));
        }
      }
    }
  });

  return [excute as F, cancel];
};
