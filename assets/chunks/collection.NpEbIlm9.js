const n=`export interface IBag {\r
  (cb?: () => void): void;\r
  (cb: AbortController): AbortController;\r
}\r
/**\r
 * The bag collects callbacks and signals, then execute and dump them all if no argument was provided.\r
 * To collect and unsubscribe clean up functions.\r
 */\r
export const Bag = (): IBag => {\r
  const set = new Set<(() => void) | AbortController>();\r
\r
  const bag = (cb => {\r
    if (cb) {\r
      set.add(cb);\r
      if (cb instanceof AbortController) {\r
        return cb;\r
      }\r
    } else {\r
      set.forEach(_ => (_ instanceof AbortController ? _.abort() : _()));\r
      set.clear();\r
    }\r
  }) as IBag;\r
\r
  return bag;\r
};\r
\r
export const Bags = <T extends object>() => {\r
  const weakMap = new WeakMap<T, IBag>();\r
\r
  const getBag = (i: T) => {\r
    if (weakMap.has(i)) {\r
      return weakMap.get(i)!;\r
    }\r
    const bag = Bag();\r
    weakMap.set(i, bag);\r
    return bag;\r
  };\r
\r
  const resetBag = (i: T) => {\r
    weakMap.get(i)?.();\r
    return getBag(i);\r
  };\r
\r
  return { getBag, resetBag, weakMap };\r
};\r
`;export{n as default};
