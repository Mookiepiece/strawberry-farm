/**
 * The bag collects callbacks, or exec & dump them all.
 */
export const Bag = () => {
  let set = new Set<() => void>();
  return function BagImpl(cb?: () => void) {
    if (cb) {
      set.add(cb);
    } else {
      set.forEach(_ => _());
      set.clear();
    }
  };
};
