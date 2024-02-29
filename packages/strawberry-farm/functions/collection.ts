interface IBin {
  (cb?: () => void): void;
  (cb: AbortController): AbortController;
}
/**
 * The bag collects callbacks and signals, then execute and dump them all if no arguments provided.
 * It is used for collect and unsubscribe clean up functions.
 */
export const Bin = (): IBin => {
  let set = new Set<(() => void) | AbortController>();

  const bin = (cb => {
    if (cb) {
      set.add(cb);
      if (cb instanceof AbortController) {
        return cb;
      }
    } else {
      set.forEach(_ => (_ instanceof AbortController ? _.abort() : _()));
      set.clear();
    }
  }) as IBin;

  return bin;
};
