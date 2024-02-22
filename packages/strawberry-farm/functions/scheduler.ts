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
 * This function is only used for bags to collect in complex senario.
 */
export const addTimeout = <T extends (...args: any[]) => void>(
  fn: T,
  timeout = 300,
): (() => void) => {
  const timer = setTimeout(fn, timeout);
  return () => clearTimeout(timer);
};

// https://github.com/vuejs/core/blob/ee4cd78a06e6aa92b12564e527d131d1064c2cd0/packages/runtime-dom/src/components/Transition.ts#L316
export function nextFrame(cb: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
