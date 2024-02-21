export interface IStore<T> {
  get(): T;
  set(value: T): void;
  subscribe(cb: (value: T) => void): () => void;
}

export const store = <T>(initialValue: T): IStore<T> => {
  let value = initialValue;
  const subscribers = new Set<(value: T) => void>();

  return {
    get: () => value,
    set(v) {
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
};
