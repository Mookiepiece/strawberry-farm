const n=`import { computed, MaybeRef, Ref, ref } from 'vue';\r
\r
export const useNav = (\r
  __current: MaybeRef<number> = 0,\r
  options: Ref<number[]>,\r
) => {\r
  const _current = ref(__current);\r
  const current = computed({\r
    get() {\r
      const i = _current.value;\r
      if (i < 0 || i >= options.value.length || options.value[i] < 0)\r
        return options.value.findIndex(i => i >= 0);\r
      return _current.value;\r
    },\r
    set: v => (_current.value = v),\r
  });\r
\r
  const nav = (delta: number, circular = false) => {\r
    const $options = options.value;\r
    const index = (() => {\r
      switch (delta) {\r
        case -Infinity:\r
          return $options.findIndex(o => o >= 0);\r
        case Infinity:\r
          return $options.findLastIndex(o => o >= 0);\r
        case -1:\r
        case 1: {\r
          const before =\r
            !circular && delta === 1 ? [] : $options.slice(0, current.value);\r
          const after =\r
            !circular && delta === -1 ? [] : $options.slice(current.value + 1);\r
\r
          const _index = [...after, ...before][\r
            delta < 0 ? 'findLastIndex' : 'findIndex'\r
          ](o => o >= 0);\r
\r
          if (_index < 0) return -1;\r
\r
          return _index < after.length\r
            ? current.value + 1 + _index\r
            : _index - after.length;\r
        }\r
        default:\r
          return -1;\r
      }\r
    })();\r
    if (index < 0) return;\r
    return (current.value = index);\r
  };\r
\r
  return {\r
    current,\r
    nav,\r
  };\r
};\r
\r
/**\r
 * FIXME: WIP\r
 */\r
export const useNav2 = (\r
  __current: MaybeRef<number> = 0,\r
  map: Ref<(number[] | number)[]>,\r
) => {};\r
`;export{n as default};
