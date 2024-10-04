const e=`export interface CustomEvents {}\r
\r
export type Events = HTMLElementEventMap & CustomEvents & Record<string, any>;\r
\r
type EventModifiers =\r
  | 'stop'\r
  | 'prevent'\r
  | 'self'\r
  | 'capture'\r
  | 'once'\r
  | 'passive';\r
type SystemKeyModifiers = 'ctrl' | 'alt' | 'shift' | 'meta' | 'exact';\r
type KeyReconizerModifiers = 'key';\r
type Modifiers = EventModifiers | SystemKeyModifiers | KeyReconizerModifiers;\r
\r
const systemModifiers = ['ctrl', 'shift', 'alt', 'meta'] as const;\r
\r
type KeyedEvent = MouseEvent | KeyboardEvent | TouchEvent;\r
/**\r
 * https://github.com/vuejs/core/blob/ee4cd78a06e6aa92b12564e527d131d1064c2cd0/packages/runtime-dom/src/directives/vOn.ts#L14\r
 */\r
const modifierGuards: Record<\r
  string,\r
  (e: Event, set: Set<string>) => void | boolean\r
> = {\r
  stop: e => e.stopPropagation(),\r
  prevent: e => e.preventDefault(),\r
  self: e => e.target !== e.currentTarget,\r
  ctrl: e => !(e as KeyedEvent).ctrlKey,\r
  shift: e => !(e as KeyedEvent).shiftKey,\r
  alt: e => !(e as KeyedEvent).altKey,\r
  meta: e => !(e as KeyedEvent).metaKey,\r
  exact: (e, set) =>\r
    systemModifiers.some(m => (e as KeyedEvent)[\`\${m}Key\`] && !set.has(m)),\r
};\r
\r
export type ON<T extends EventTarget> = (target: T) => ON2;\r
\r
export type ON2 = {\r
  [N in keyof Events]: ON3<N, Events[N]>;\r
};\r
\r
export type ON3<N extends keyof Events, E extends Events[N]> = ((\r
  listener: (ev: E) => void,\r
) => () => void) & {\r
  [K in Modifiers]: ON3<N, E>;\r
} & (E extends KeyboardEvent\r
    ? {\r
        [K in string]: ON3<N, E>;\r
      }\r
    : void);\r
\r
/**\r
 * Inspired by vue vOn\r
 */\r
export const on = <T extends EventTarget>(el: T) => {\r
  const _modifiers: string[] = [];\r
\r
  const polaris = new Proxy(() => {}, {\r
    get(_, p) {\r
      _modifiers.push(p as string);\r
      return polaris;\r
    },\r
    apply(_, __, argArray) {\r
      const [type, ...m] = _modifiers;\r
      const set = new Set<Modifiers>(m as any[]);\r
\r
      const capture = set.has('capture');\r
      const once = set.has('once');\r
      const passive = set.has('passive');\r
      set.delete('capture');\r
      set.delete('once');\r
      set.delete('passive');\r
\r
      const codeVsKey: 'code' | 'key' = set.has('key') ? 'key' : 'code';\r
      set.delete('key');\r
\r
      const fn = (e: Event) => {\r
        for (const modifier of set) {\r
          if (!modifierGuards[modifier]) {\r
            if (modifier !== (e as KeyboardEvent)[codeVsKey]) return;\r
          } else if (modifierGuards[modifier](e, set)) return;\r
        }\r
\r
        argArray[0](e instanceof CustomEvent ? e.detail : e);\r
      };\r
\r
      el.addEventListener(type, fn, { capture, once, passive });\r
      return () => el.removeEventListener(type, fn);\r
    },\r
  }) as any as ON2;\r
  return polaris;\r
};\r
`;export{e as default};
