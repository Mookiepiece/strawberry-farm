interface IBag {
  (cb?: () => void): void;
  (cb: AbortController): AbortController;
}
/**
 * The bag collects callbacks and signals, then execute and dump them all if no argument was provided.
 * To collect and unsubscribe clean up functions.
 */
export const Bag = (): IBag => {
  let set = new Set<(() => void) | AbortController>();

  const bag = (cb => {
    if (cb) {
      set.add(cb);
      if (cb instanceof AbortController) {
        return cb;
      }
    } else {
      set.forEach(_ => (_ instanceof AbortController ? _.abort() : _()));
      set.clear();
    }
  }) as IBag;

  return bag;
};
