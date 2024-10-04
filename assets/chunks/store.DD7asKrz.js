const r=`export interface IStore<T> {\r
  get(): T;\r
  set(value: ((prev: T) => T) | T): void;\r
  subscribe(cb: (value: T) => void): () => void;\r
}\r
\r
export const store = <T>(initialValue: T): IStore<T> => {\r
  let value = initialValue;\r
  const subscribers = new Set<(value: T) => void>();\r
\r
  const store: IStore<T> = {\r
    get: () => value,\r
    set(_v) {\r
      let v: T = typeof _v === 'function' ? (_v as any)(store.get()) : _v;\r
      if (!Object.is(value, v)) {\r
        value = v;\r
        subscribers.forEach(_ => _(value));\r
      }\r
    },\r
    subscribe: cb => {\r
      subscribers.add(cb);\r
      return () => subscribers.delete(cb);\r
    },\r
  };\r
  return store;\r
};\r
`;export{r as default};
