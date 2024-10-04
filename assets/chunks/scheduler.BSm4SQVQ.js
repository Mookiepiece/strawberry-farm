const n=`import { FunctionReturningPromise } from './misc';\r
\r
/**\r
 * Supports AbortSignal for unsubscription (e.g. Vue SFC unmount)\r
 */\r
export const debounce = <T extends (...args: any[]) => void>(\r
  fn: T,\r
  timeout = 300,\r
  signal?: AbortSignal,\r
): T => {\r
  let timer: ReturnType<typeof setTimeout>;\r
  signal?.addEventListener('abort', () => void clearTimeout(timer));\r
  return ((...args) => {\r
    clearTimeout(timer);\r
    timer = setTimeout(() => !signal?.aborted && fn(...args), timeout);\r
  }) as T;\r
};\r
\r
/**\r
 * This function is **only** used for bags to collect in **complex** senario.\r
 */\r
export const onTimeout = <T extends (...args: any[]) => void>(\r
  fn: T,\r
  timeout = 300,\r
): (() => void) => {\r
  const timer = setTimeout(fn, timeout);\r
  return () => clearTimeout(timer);\r
};\r
\r
// https://github.com/vuejs/core/blob/ee4cd78a06e6aa92b12564e527d131d1064c2cd0/packages/runtime-dom/src/components/Transition.ts#L316\r
export function nextFrame(cb: () => void, signal?: AbortSignal) {\r
  let timer: number;\r
  signal?.addEventListener('abort', () => void cancelAnimationFrame(timer));\r
  timer = requestAnimationFrame(() => {\r
    if (!signal?.aborted) {\r
      timer = requestAnimationFrame(() => {\r
        if (!signal?.aborted) {\r
          cb();\r
        }\r
      });\r
    }\r
  });\r
\r
  return;\r
}\r
\r
export const onetime = <T extends (...args: any[]) => void>(fn: T) => {\r
  let done = false;\r
  return ((...args) => {\r
    !done && fn(...args);\r
    done = true;\r
  }) as T;\r
};\r
\r
export const share = <T extends FunctionReturningPromise>(fn: T) => {\r
  let i: Promise<any> | undefined;\r
  return ((...args: Parameters<T>) =>\r
    (i = i || fn(...args).finally(() => (i = undefined)))) as T;\r
};\r
\r
export const longPress = <T extends FunctionReturningPromise>(\r
  fn: T,\r
  signal?: AbortSignal,\r
) => {\r
  fn();\r
  debounce(\r
    () => {\r
      const i = setInterval(fn, 100);\r
      signal?.addEventListener('abort', () => clearInterval(i));\r
    },\r
    300,\r
    signal,\r
  )();\r
};\r
`;export{n as default};
