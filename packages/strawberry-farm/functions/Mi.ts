export type Emitter<T> = {
  deps: { [K in keyof T]: undefined | Set<(payload: T[K]) => void> };
  on: <K extends keyof T>(event: K, callback: (payload: T[K]) => void) => () => void;
  off: <K extends keyof T>(event: K, callback: (payload: T[K]) => void) => void;
  emit: <K extends keyof T>(
    ...args: T[K] extends undefined ? [event: K, payload?: T[K]] : [event: K, payload: T[K]]
  ) => void;
};

export const Mi = <T>(): Emitter<T> => {
  const deps = {} as Emitter<T>['deps'];

  const on = ((k, f) => (
    (deps[k] = (deps[k] ?? new Set()).add(f)), () => off(k, f)
  )) as Emitter<T>['on'];

  const off = ((k, f) => {
    deps[k]?.delete(f);
  }) as Emitter<T>['off'];

  const emit = ((k, v) => {
    deps[k]?.forEach(f => (f as any)(v));
  }) as Emitter<T>['emit'];

  return { deps, on, off, emit };
};
