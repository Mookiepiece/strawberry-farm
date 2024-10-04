const n=`<script lang="ts">\r
const weakCache = <F extends (param: any) => any>(cb: F): F => {\r
  const weakMap = new WeakMap<any, any>();\r
\r
  return ((param: any) =>\r
    weakMap.get(param) ||\r
    (() => {\r
      const a = cb(param);\r
      weakMap.set(param, a);\r
      return a;\r
    })()) as F;\r
};\r
\r
const objKeyBuckets = new WeakMap();\r
const ObjKey = (cacheKey: any) => {\r
  return (\r
    (cacheKey && objKeyBuckets.get(cacheKey)) ||\r
    (() => {\r
      const key = 0n;\r
      const ids = new WeakMap<any, string>();\r
      const ans = (i: any) => {\r
        if (typeof i === 'symbol') {\r
          return i;\r
        }\r
        if (i && typeof i === 'object') {\r
          return (\r
            ids.get(i) ||\r
            (() => {\r
              const ans = 'object' + key.toString(36);\r
              ids.set(i, ans);\r
              return ans;\r
            })()\r
          );\r
        }\r
\r
        return typeof i + i;\r
      };\r
      objKeyBuckets.set(cacheKey, ans);\r
      return ans;\r
    })()\r
  );\r
};\r
\r
const toArray = (a: any) => (Array.isArray(a) ? a : [a]);\r
\r
export const useListboxExtra = weakCache((listbox: Listbox) => {\r
  const addRange = (a: number, b: number) => {\r
    if (a < 0 || b < 0) return;\r
    const range = listbox.options.slice(Math.min(a, b), Math.max(a, b) + 1);\r
    const models = new Set(listbox.model);\r
    listbox.input(...range.map(r => r.value).filter(i => !models.has(i)));\r
  };\r
\r
  const findIndex = (v: any) =>\r
    listbox.options.findIndex(({ value }) => value === v);\r
\r
  let anchor = -1;\r
  const handleKeydown = (\r
    e: KeyboardEvent,\r
    {\r
      circular = false,\r
      magnetic = true,\r
    }: {\r
      circular?: boolean;\r
      magnetic?: boolean;\r
    } = {},\r
  ) => {\r
    if (listbox.disabled) return;\r
\r
    if (e.shiftKey) {\r
      anchor = listbox.current;\r
    } else {\r
      anchor = -1;\r
    }\r
\r
    if (e.shiftKey) {\r
      if (!listbox.multi) return;\r
      const { nav } = listbox;\r
      switch (e.key) {\r
        case 'ArrowUp':\r
        case 'ArrowLeft':\r
          e.preventDefault();\r
          nav(-1);\r
          addRange(anchor, listbox.current);\r
          break;\r
        case 'ArrowDown':\r
        case 'ArrowRight':\r
          e.preventDefault();\r
          nav(1);\r
          addRange(anchor, listbox.current);\r
          break;\r
        case 'Home':\r
          e.preventDefault();\r
          nav(Number.NEGATIVE_INFINITY);\r
          addRange(anchor, listbox.current);\r
          break;\r
        case 'End':\r
          e.preventDefault();\r
          nav(Number.POSITIVE_INFINITY);\r
          addRange(anchor, listbox.current);\r
          break;\r
      }\r
    } else {\r
      const nav = (delta: number) => {\r
        if (magnetic === e.ctrlKey) return listbox.nav(delta, circular);\r
        const prev = listbox.current;\r
        listbox.nav(delta, circular);\r
        if (prev !== listbox.current) {\r
          listbox.input(...toArray(listbox.model), listbox);\r
        }\r
      };\r
\r
      switch (e.key) {\r
        case 'ArrowUp':\r
        case 'ArrowLeft':\r
          e.preventDefault();\r
          nav(-1);\r
          break;\r
        case 'ArrowDown':\r
        case 'ArrowRight':\r
          e.preventDefault();\r
          nav(1);\r
          break;\r
        case 'Home':\r
          e.preventDefault();\r
          nav(Number.NEGATIVE_INFINITY);\r
          break;\r
        case 'End':\r
          e.preventDefault();\r
          nav(Number.POSITIVE_INFINITY);\r
          break;\r
        case ' ':\r
          e.preventDefault();\r
          listbox.input(listbox);\r
          break;\r
      }\r
    }\r
  };\r
\r
  const handlePointerdown = (\r
    e: MouseEvent,\r
    i: ListboxLeaf,\r
    { magnetic = true }: { magnetic?: boolean } = {},\r
  ) => {\r
    if (i.disabled) return;\r
    if (listbox.multi) {\r
      if (e.shiftKey) {\r
        document.getSelection()?.removeAllRanges();\r
        const a = i.index;\r
        const b = (anchor > -1 && anchor) || listbox.current;\r
        if (b >= 0) {\r
          listbox.current = a;\r
          useListboxExtra(listbox).addRange(a, b);\r
        }\r
      } else {\r
        if (e.ctrlKey === magnetic) {\r
          listbox.input(i.value);\r
          listbox.current = i.index;\r
        } else {\r
          listbox.input(...listbox.model, i.value);\r
          listbox.current = i.index;\r
        }\r
      }\r
    } else {\r
      listbox.input(i.value);\r
      listbox.current = i.index;\r
    }\r
  };\r
\r
  return {\r
    addRange,\r
    findIndex,\r
    getAnchor: () => anchor,\r
\r
    handlePointerdown,\r
    handleKeydown,\r
  };\r
});\r
<\/script>\r
\r
<script setup lang="ts" generic="T = any">\r
import { cloneVNode, h, ref, toRef } from 'vue';\r
import { ListboxLeaf, ListboxGroup, Listbox } from './listbox';\r
import { useListbox, UseListboxProps } from './listbox';\r
import { child } from '../shared';\r
\r
const model = defineModel();\r
\r
const props = withDefaults(\r
  defineProps<\r
    UseListboxProps<T> & {\r
      listbox?: Listbox<T>;\r
      circular?: boolean;\r
      magnetic?: boolean;\r
      action?(e: KeyboardEvent, listbox: Listbox): void;\r
    }\r
  >(),\r
  { magnetic: true },\r
);\r
\r
const slots = defineSlots<{\r
  default?(props: { option: ListboxLeaf<T> }): any;\r
  group?(props: { group: ListboxGroup<T> }): any;\r
}>();\r
\r
const listbox = props.listbox || useListbox(model, props);\r
const listboxEX = useListboxExtra(listbox);\r
const current = toRef(listbox, 'current');\r
\r
const renderOption = (i: ListboxLeaf<T>) =>\r
  cloneVNode(\r
    (slots.default && child(slots.default({ option: i }))) || h('div', i.label),\r
    {\r
      id: listbox.id + ':' + i.index,\r
      onPointerdown: (e: MouseEvent) =>e.shiftKey && e.preventDefault(),\r
      onClick: (e: MouseEvent) =>\r
        listboxEX.handlePointerdown(e, i, { magnetic: props.magnetic }),\r
      'data-key': objKey(i.value),\r
      role: 'option',\r
      'aria-selected':\r
        (Array.isArray(listbox.model)\r
          ? listbox.model.includes(i.value)\r
          : listbox.model === i.value) || undefined,\r
      class: listbox.current === i.index && 'current',\r
      'aria-disabled': props.disabled || i.disabled || undefined,\r
    },\r
  );\r
\r
const onKeyDown = (e: KeyboardEvent) => {\r
  if (e.key === 'Enter') {\r
    props.action ? props.action(e, listbox) : (root.value as HTMLElement).closest('form')?.submit();\r
  } else {\r
    listboxEX.handleKeydown(e, {\r
      circular: props.circular,\r
      magnetic: props.magnetic,\r
    });\r
  }\r
};\r
\r
const root = ref()\r
\r
const objKey = ObjKey(listbox);\r
\r
defineExpose({ listbox });\r
<\/script>\r
\r
<template>\r
  <div\r
    ref="root"\r
    :id="listbox.id"\r
    @keydown.self="onKeyDown"\r
    role="listbox"\r
    :tabindex="props.disabled ? -1 : 0"\r
    :aria-disabled="props.disabled"\r
    :aria-activedescendant="\r
      current > -1 ? \`\${listbox.id}:\${current}\` : undefined\r
    "\r
    :aria-multiselectable="listbox.multi"\r
  >\r
    <template\r
      v-for="(g, index) in listbox.tree"\r
      :key="\r
        g && typeof g === 'object' && 'options' in g\r
          ? g.title\r
            ? 'g' + g.title\r
            : 'G' + index\r
          : objKey(g.value)\r
      "\r
    >\r
      <div\r
        role="group"\r
        :aria-label="g.title"\r
        v-if="g && typeof g === 'object' && 'options' in g"\r
      >\r
        <slot name="group" :group="g">\r
          <h6>{{ g.title }}</h6>\r
        </slot>\r
        <component\r
          v-for="i in g.options"\r
          :key="objKey(i.value)"\r
          :is="renderOption(i)"\r
        />\r
      </div>\r
      <component v-else :is="renderOption(g)" />\r
    </template>\r
  </div>\r
</template>\r
`;export{n as default};
