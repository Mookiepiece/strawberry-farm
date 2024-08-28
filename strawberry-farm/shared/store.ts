export interface IStore<T> {
  get(): T;
  set(value: ((prev: T) => T) | T): void;
  subscribe(cb: (value: T) => void): () => void;
}

export const store = <T>(initialValue: T): IStore<T> => {
  let value = initialValue;
  const subscribers = new Set<(value: T) => void>();

  const store: IStore<T> = {
    get: () => value,
    set(_v) {
      let v: T = typeof _v === 'function' ? (_v as any)(store.get()) : _v;
      if (!Object.is(value, v)) {
        value = v;
        subscribers.forEach(_ => _(value));
      }
    },
    subscribe: cb => {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },
  };
  return store;
};
