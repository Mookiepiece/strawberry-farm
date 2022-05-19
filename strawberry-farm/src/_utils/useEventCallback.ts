// mirror of starfall
import React from 'react';
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect;

export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = React.useRef(fn);

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });

  return React.useCallback((...args: unknown[]) => ref.current.apply(void 0, args), []) as T;
}
