import _useAsyncFn from 'react-use/lib/useAsyncFn';
import {AsyncFnReturn} from 'react-use/lib/useAsync';
import {FunctionReturningPromise} from 'react-use/lib/misc/types';

// This hook imporves original "promise return trigger" 
// with type friendly "void return trigger"

export default function useAsyncFn<T extends FunctionReturningPromise>(
    ...paramsz:  Parameters<typeof _useAsyncFn>
):[AsyncFnReturn<T>[0], (...params:Parameters<T>) => void] {
    const [state, _trigger] = useAsyncFn(...paramsz);
    const trigger = (...params:Parameters<T>) => void _trigger(...params);
    return [state, trigger];
}