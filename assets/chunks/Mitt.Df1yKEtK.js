const e=`export type Emitter<T> = {\r
  deps: { [K in keyof T]: undefined | Set<(payload: T[K]) => void> };\r
  on: <K extends keyof T>(event: K, callback: (payload: T[K]) => void) => () => void;\r
  off: <K extends keyof T>(event: K, callback: (payload: T[K]) => void) => void;\r
  emit: <K extends keyof T>(\r
    ...args: T[K] extends undefined ? [event: K, payload?: T[K]] : [event: K, payload: T[K]]\r
  ) => void;\r
};\r
\r
export const Mitt = <T>(): Emitter<T> => {\r
  const deps = {} as Emitter<T>['deps'];\r
\r
  const on = ((k, f) => (\r
    (deps[k] = (deps[k] ?? new Set()).add(f)), () => off(k, f)\r
  )) as Emitter<T>['on'];\r
\r
  const off = ((k, f) => {\r
    deps[k]?.delete(f);\r
  }) as Emitter<T>['off'];\r
\r
  const emit = ((k, v) => {\r
    deps[k]?.forEach(f => (f as any)(v));\r
  }) as Emitter<T>['emit'];\r
\r
  return { deps, on, off, emit };\r
};\r
`;export{e as default};
