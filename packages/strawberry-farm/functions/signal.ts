const PreactSignalsSymbol = Symbol.for('preact-signals');

export type Signal<T = any> = {
  _value: T;
  value: T;
  peek(): T;

  _effects: Set<Effect>;

  subscribe(cb: (v: T) => void): () => void;

  brand: typeof PreactSignalsSymbol;
  toString(): string;
  toJSON(): T;
  valueOf(): T;
};

export type Effect<T = void> = {
  run: () => T;
  _signals: Set<Signal>;
  dispose: () => void;
  scheduler?: (run: () => void) => void;
  queue?: 'pre';
};

type Batch = {
  effect?: Effect;
  affected: Map<Signal, any>;
};

let t = 0;

export const signal = <T>(initialValue: T): Signal<T> => {
  const sig: Signal<T> = {
    _value: initialValue,
    get value() {
      if (t++ > 200) throw new Error();
      const activeEffect = activeBatches.at(-1)?.effect;
      if (activeEffect) {
        activeEffect._signals.add(sig);
        this._effects.add(activeEffect);
      }
      return sig._value;
    },

    set value(v: T) {
      if (t++ > 200) throw new Error();

      const activeBatch = activeBatches.at(-1);
      if (!activeBatch) {
        batch(() => (sig.value = v));
        return;
      }

      if (!activeBatch.affected.has(sig)) {
        activeBatch.affected.set(sig, sig._value);
      }
      sig._value = v;
    },
    _effects: new Set(),

    subscribe(cb) {
      return effect(() => {
        const v = sig.value;
        untracked(() => cb(v));
      }).dispose;
    },

    brand: PreactSignalsSymbol,
    peek: () => sig._value,
    toString: () => '' + sig._value,
    toJSON: () => sig._value,
    valueOf: () => sig._value,
  };

  return sig;
};

export const effect = <T = void>(
  cb: () => T,
  options?: {
    lazy?: boolean;
    scheduler?(cb: () => void): void;
    queue?: 'pre';
  },
): Effect<T> => {
  const signals = new Set<Signal>();

  const dispose = () => {
    eff._signals.forEach(sig => sig._effects.delete(eff));
    eff._signals.clear();
  };
  const run = () => {
    dispose();
    return _batch(() => cb(), eff);
  };

  const eff: Effect<T> = {
    run: run,
    _signals: signals,
    dispose,
  };

  if (options?.queue) {
    eff.queue = options.queue;
  }
  if (options?.scheduler) {
    eff.scheduler = options.scheduler;
  }

  if (!options?.lazy) eff.run();

  return eff;
};

let activeBatches: (Batch | null)[] = [];

export const untracked = (cb: () => void) => {
  activeBatches.push(null);
  cb();
  activeBatches.pop();
};

export const batch = <T = void>(cb: () => T): T => _batch(cb);

const _batch = <T = void>(cb: () => T, eff?: Effect): T => {
  activeBatches.push({
    effect: eff,
    affected: new Map(),
  });
  const ans = cb();
  const bat = activeBatches.pop()!;

  const effs = new Set<Effect>();
  bat.affected.forEach(
    (originalValue, sig) =>
      !Object.is(sig.peek(), originalValue) &&
      sig._effects.forEach(eff => effs.add(eff)),
  );
  [...effs]
    .sort((a, b) => (b.queue?.length ?? 0) - (a.queue?.length ?? 0))
    .forEach(eff => (eff.scheduler ? eff.scheduler(eff.run) : eff.run()));

  return ans;
};

export const computed = <T>(cb: () => T): Signal<T> => {
  let dirty = true;

  const eff: Effect<T> = effect(() => (sig._value = cb()), {
    scheduler() {
      // dirty chain for signal -> computed -> computed tree
      dirty = true;
      sig._effects.forEach(e => {
        e.queue === 'pre' && e.scheduler?.(() => {});
      });
    },
    queue: 'pre',
    lazy: true,
  });

  const calc = () => {
    if (dirty) {
      dirty = false;
      return eff.run();
    }
  };

  const sig: Signal<T> = {
    _value: undefined as any,
    get value() {
      if (t++ > 200) throw new Error();
      calc();
      const activeEffect = activeBatches.at(-1)?.effect;
      if (activeEffect) {
        activeEffect._signals.add(sig);
        this._effects.add(activeEffect);
      }
      return sig._value;
    },

    set value(v: T) {
      throw new Error();
    },
    _effects: new Set(),

    subscribe(cb) {
      return effect(() => {
        const v = sig.value;
        untracked(() => cb(v));
      }).dispose;
    },

    brand: PreactSignalsSymbol,
    peek: () => {
      calc();
      return sig._value;
    },
    toString: () => '' + sig._value,
    toJSON: () => sig._value,
    valueOf: () => sig._value,
  };

  return sig;
};
