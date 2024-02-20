const PreactSignalsSymbol = Symbol.for('preact-signals');

type Signal<T = any> = {
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

type Effect = {
  call: () => void;
  _signals: Set<Signal>;
  dispose: () => void;
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
      });
    },

    brand: PreactSignalsSymbol,
    peek: () => sig._value,
    toString: () => '' + sig._value,
    toJSON: () => sig._value,
    valueOf: () => sig._value,
  };

  return sig;
};

export const effect = (cb: (eff: Effect) => any): (() => void) => {
  const signals = new Set<Signal>();

  let cleanup: (() => void) | void;

  const dispose = () => {
    cleanup?.();
    eff._signals.forEach(sig => sig._effects.delete(eff));
    eff._signals.clear();
  };
  const call = () => {
    dispose();
    const _cleanup = _batch(() => cb(eff), eff);
    if (typeof _cleanup === 'function') cleanup = _cleanup;
  };

  const eff: Effect = {
    call,
    _signals: signals,
    dispose,
  };

  eff.call();

  return eff.dispose;
};

let activeBatches: (Batch | null)[] = [];

const untracked = (cb: () => void) => {
  activeBatches.push(null);
  cb();
  activeBatches.pop();
};

export const batch = (cb: () => any): (() => void) | void => _batch(cb);

const _batch = (cb: () => any, eff?: Effect): (() => void) | void => {
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
      sig._effects.forEach(eff => effs.add(eff))
  );
  effs.forEach(eff => eff.call());

  return ans;
};

export const computed = <T>(cb: () => T): Signal<T> => {
  let dirty = true;

  const setValue = (v: T) => {
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
  };

  const sig: Signal<T> = {
    _value: undefined as any,
    get value() {
      if (t++ > 200) throw new Error();

      if (dirty) {
        let eff: Effect = undefined as any;
        const dispose = effect(_eff => {
          eff = _eff;
          sig._value = cb();
        });

        const subs = [...eff._signals].map(sig => {
          let t = 0;
          return sig.subscribe(() => {
            if (!t++) return;
            dirty = true;
            subs.forEach(_ => _());
          });
        });

        dispose();
        dirty = false;
      }

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
      });
    },

    brand: PreactSignalsSymbol,
    peek: () => sig._value,
    toString: () => '' + sig._value,
    toJSON: () => sig._value,
    valueOf: () => sig._value,
  };

  return sig;
};
