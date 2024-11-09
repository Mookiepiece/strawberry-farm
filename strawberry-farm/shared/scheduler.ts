/**
 * Supports AbortSignal for unsubscription (e.g. Vue SFC unmount)
 */
export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  timeout = 300,
  signal?: AbortSignal,
): T => {
  let timer: ReturnType<typeof setTimeout>;
  signal?.addEventListener('abort', () => void clearTimeout(timer));
  return ((...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => !signal?.aborted && fn(...args), timeout);
  }) as T;
};

/**
 * This function is **only** used for bags to collect in **complex** senario.
 */
export const onTimeout = <T extends (...args: any[]) => void>(
  fn: T,
  timeout = 300,
): (() => void) => {
  const timer = setTimeout(fn, timeout);
  return () => clearTimeout(timer);
};

// https://github.com/vuejs/core/blob/ee4cd78a06e6aa92b12564e527d131d1064c2cd0/packages/runtime-dom/src/components/Transition.ts#L316
export function nextFrame(cb: () => void, signal?: AbortSignal) {
  let timer: number;
  signal?.addEventListener('abort', () => void cancelAnimationFrame(timer));
  timer = requestAnimationFrame(() => {
    if (!signal?.aborted) {
      timer = requestAnimationFrame(() => {
        if (!signal?.aborted) {
          cb();
        }
      });
    }
  });

  return;
}

export const onetime = <T extends (...args: any[]) => void>(fn: T) => {
  let done = false;
  return ((...args) => {
    !done && fn(...args);
    done = true;
  }) as T;
};

export const share = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  let i: Promise<any> | undefined;
  return ((...args: Parameters<T>) =>
    (i = i || fn(...args).finally(() => (i = undefined)))) as T;
};

export const longPress = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  signal?: AbortSignal,
) => {
  fn();
  debounce(
    () => {
      const i = setInterval(fn, 100);
      signal?.addEventListener('abort', () => clearInterval(i));
    },
    300,
    signal,
  )();
};
