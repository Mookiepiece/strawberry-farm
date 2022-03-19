import type _useAsyncFn from 'react-use/lib/useAsyncFn';
import type { AsyncFnReturn } from 'react-use/lib/useAsync';
import type { FunctionReturningPromise } from 'react-use/lib/misc/types';

// This hook imporves original "promise return trigger"
// with type friendly "void return trigger"

export function useAsyncFn<T extends FunctionReturningPromise>(
  ...paramsz: Parameters<typeof _useAsyncFn>
): [AsyncFnReturn<T>[0], (...params: Parameters<T>) => void] {
  const [state, _trigger] = useAsyncFn(...paramsz);
  const trigger = (...params: Parameters<T>) => void _trigger(...params);
  return [state, trigger];
}
