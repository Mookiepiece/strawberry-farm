const r=`import { reactive } from 'vue';\r
import { AsyncState, FunctionReturningPromise } from './misc';\r
\r
/**\r
 * @license MIT https://github.com/streamich/react-use/blob/ade8d3905f544305515d010737b4ae604cc51024/src/useAsyncFn.ts#L36\r
 */\r
export const useAsyncFn = <T extends FunctionReturningPromise>(fn: T) => {\r
  const state = reactive<AsyncState<Awaited<ReturnType<T>>>>({\r
    loading: false,\r
  });\r
\r
  let key = 0;\r
  const abort = () => void ++key;\r
\r
  const trigger = ((...args: Parameters<T>) => {\r
    const _key = ++key;\r
    state.loading = true;\r
    return fn(...args)\r
      .then(v => {\r
        if (_key !== key) throw new DOMException('', 'AbortError');\r
        return (state.data = v);\r
      })\r
      .catch(e => {\r
        if (_key !== key) throw new DOMException('', 'AbortError');\r
        state.error = e;\r
        throw e;\r
      })\r
      .finally(() => {\r
        if (_key !== key) return;\r
        state.loading = false;\r
      });\r
  }) as T;\r
\r
  return { state, trigger, abort };\r
};\r
`;export{r as default};
