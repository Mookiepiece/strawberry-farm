import { computed, MaybeRef, Ref, ref } from 'vue';

/**
 * 
 * @param __current Initial value. default to 0.
 * @param options The linear dungeon, 0 repesents disabled, otherwise represents the index of the option.
 * @returns 
 */
export const useNav = (
  __current: MaybeRef<number> = 0,
  options: Ref<number[]>,
) => {
  const _current = ref(__current);
  const current = computed({
    get() {
      const i = _current.value;
      if (i < 0 || i >= options.value.length || options.value[i] < 0)
        return options.value.findIndex(i => i >= 0);
      return _current.value;
    },
    set: v => (_current.value = v),
  });

  const nav = (delta: number, circular = false) => {
    const $options = options.value;
    const index = (() => {
      switch (delta) {
        case -Infinity:
          return $options.findIndex(o => o >= 0);
        case Infinity:
          return $options.findLastIndex(o => o >= 0);
        case -1:
        case 1: {
          const before =
            !circular && delta === 1 ? [] : $options.slice(0, current.value);
          const after =
            !circular && delta === -1 ? [] : $options.slice(current.value + 1);

          const _index = [...after, ...before][
            delta < 0 ? 'findLastIndex' : 'findIndex'
          ](o => o >= 0);

          if (_index < 0) return -1;

          return _index < after.length
            ? current.value + 1 + _index
            : _index - after.length;
        }
        default:
          return -1;
      }
    })();
    if (index < 0) return;
    return (current.value = index);
  };

  return {
    current,
    nav,
  };
};

/**
 * FIXME: WIP
 */
export const useNav2 = (
  __current: MaybeRef<number> = 0,
  map: Ref<(number[] | number)[]>,
) => {};
