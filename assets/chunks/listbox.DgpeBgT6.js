const n=`import { computed, reactive, Ref, ref } from 'vue';\r
import { wai } from '../shared';\r
import { useNav } from './nav';\r
\r
export type ListboxOption<T = any> = {\r
  value: any;\r
  label?: string;\r
  disabled?: boolean;\r
  meta?: T;\r
};\r
\r
export type ListboxOptionSlim<T = any> =\r
  | ListboxOption<T>\r
  | string\r
  | number\r
  | bigint\r
  | boolean\r
  | null\r
  | undefined\r
  | symbol\r
  | object;\r
\r
export type ListboxGroup<T = any> = {\r
  title?: string;\r
  options: ListboxOptionSlim<T>[];\r
  meta?: T;\r
};\r
\r
export type ListboxInput<T = any> = (ListboxGroup<T> | ListboxOptionSlim<T>)[];\r
\r
/**\r
 * Normalize grouped listbox input into options matches sharp \`{ value:any; label: string }\`\r
 */\r
export const flatOptions = <T = any>(i: ListboxInput<T>): ListboxOption<T>[] =>\r
  i\r
    .flatMap(o => (typeof o === 'object' && o && 'title' in o ? o.options : o))\r
    .map(o => {\r
      if (typeof o === 'object' && o) {\r
        if (!('label' in o)) {\r
          return {\r
            ...(o as { value: any }),\r
            label: String((o as { value: any }).value),\r
          };\r
        }\r
        return o;\r
      }\r
      return { value: o, label: String(o) };\r
    });\r
\r
export type ListboxLeaf<T = any> = ListboxOption<T> & {\r
  index: number;\r
};\r
\r
export type UseListboxProps<T = any> = {\r
  disabled?: boolean;\r
  options?: ListboxInput<T>;\r
  /**\r
   * Toggle the same option will unselect it in signle selection mode.\r
   */\r
  clearable?: boolean;\r
};\r
export type Listbox<T = any> = {\r
  model: any;\r
\r
  /**\r
   * The \`id\` for creating \`aria-activedescendant\` to indicate current focused option.\r
   */\r
  id: string;\r
\r
  /**\r
   * model \`Array.isArray()\`\r
   */\r
  multi: boolean;\r
  /**\r
   * Contains the original (grouped) hierarchy and extra info to rendering the UI.\r
   */\r
  tree: ({ title?: string; options: ListboxLeaf<T>[] } | ListboxLeaf<T>)[];\r
  /**\r
   * List of options after flatten and normalized, which are objects with \`value\` property.\r
   */\r
  options: ListboxOption<T>[];\r
  /**\r
   * Current focuing option index (after options are flatted)\r
   */\r
  current: number;\r
  /**\r
   * Move focus based on the delta number, skipping \`disabled\` options.\r
   *\r
   * If \`circular\`, \`nav()\` will across two edges if receives \`1\` | \`-1\` like radios.\r
   *\r
   * @example\r
   * \`\`\`js\r
   * -Infinity // Home\r
   * -1 // previuse\r
   * 1  // next\r
   * Infinity // End\r
   * \`\`\`\r
   */\r
  nav(delta: number, circular?: boolean): void;\r
  /**\r
   * Toggle selection for value(s).\r
   *\r
   * Will validate \`disabled\` state.\r
   *\r
   * Passing \`listbox\` will toggle current value.\r
   */\r
  input(...values: any[]): void;\r
  disabled: boolean;\r
};\r
\r
export const useListbox = <T = any>(\r
  model: Ref<any>,\r
  props: UseListboxProps<T>,\r
): Listbox<T> => {\r
  const id = wai();\r
  const options = computed(() => flatOptions(props.options ?? []));\r
  const multi = computed(() => Array.isArray(model.value));\r
  const disabled = computed(() => !!props.disabled);\r
\r
  const tree = computed<Listbox<T>['tree']>(() => {\r
    let _index = 0;\r
\r
    const normalize = (o: ListboxOptionSlim<T>): ListboxLeaf<T> => {\r
      const value = typeof o === 'object' && o ? (o as any).value : o;\r
      const index = _index++;\r
\r
      return {\r
        value,\r
        // prettier-ignore\r
        label: typeof o === 'object' && o ? String((o as any).label ?? (o as any).value) : String(o),\r
        meta: typeof o === 'object' && o ? (o as any).meta : undefined,\r
        // prettier-ignore\r
        disabled: typeof o === 'object' && o  &&  (o as any).disabled || false,\r
        index,\r
        // prettier-ignore\r
        // selected: multi.value ? model.value.includes(value) : value === model.value,\r
      };\r
    };\r
\r
    return (props.options ?? []).map(i => {\r
      if (typeof i === 'object' && i && 'options' in i)\r
        return {\r
          ...i,\r
          options: i.options.map(normalize),\r
        };\r
      return normalize(i);\r
    });\r
  });\r
\r
  const map = computed(() =>\r
    options.value.map((i, index) => (i.disabled ? -1 : index)),\r
  );\r
\r
  const { current, nav: _nav } = useNav(\r
    Math.max(\r
      0,\r
      options.value.findIndex(\r
        o =>\r
          !o.disabled &&\r
          (Array.isArray(model.value)\r
            ? model.value.includes(o.value)\r
            : model.value === o.value),\r
      ),\r
    ),\r
    map,\r
  );\r
\r
  const nav = (delta: number, circular?: boolean) => {\r
    if (disabled.value) return;\r
    const i = _nav(delta, circular);\r
    if (i === undefined) return;\r
    scrollCurrentIntoView();\r
  };\r
\r
  const input = (..._values: any[]) => {\r
    if (disabled.value) return;\r
\r
    let $model = model.value;\r
\r
    _values.forEach(_value => {\r
      let value = _value;\r
      if (value === listbox) {\r
        if (current.value < 0) return;\r
        value = options.value[current.value].value;\r
      }\r
\r
      const index = options.value.findIndex(i => i.value === value);\r
      if (index < 0) return;\r
      const option = options.value[index];\r
      if (option?.disabled) return;\r
\r
      if (Array.isArray($model))\r
        $model = $model.includes(value)\r
          ? $model.toSpliced($model.indexOf(value), 1)\r
          : [...$model, value];\r
      else if (props.clearable && $model === value) $model = null;\r
      else $model = value;\r
    });\r
\r
    model.value = $model;\r
  };\r
\r
  const scrollCurrentIntoView = (() => {\r
    const io = new IntersectionObserver(([entry]) => {\r
      if ((entry.intersectionRatio || 0) < 1) {\r
        entry.target.scrollIntoView({ block: 'center', inline: 'center' });\r
      }\r
      io.disconnect();\r
    });\r
    return () => {\r
      io.disconnect();\r
      io.observe(document.getElementById(id + ':' + current.value)!);\r
    };\r
  })();\r
\r
  const listbox: Listbox<T> = reactive({\r
    model,\r
    id,\r
    tree,\r
    multi,\r
    options,\r
    current,\r
    disabled,\r
    nav,\r
    input,\r
  });\r
\r
  return listbox;\r
};\r
`;export{n as default};
