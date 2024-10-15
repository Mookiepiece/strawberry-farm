const r=`<script setup lang="ts" generic="T">\r
import { ListboxInput } from '../patterns';\r
import VListbox from '../patterns/VListbox.vue';\r
import {\r
  applyTransform,\r
  flip,\r
  margin,\r
  maxHeight,\r
  PopPlugin,\r
  sameWidth,\r
} from '../shared';\r
import VPopover from './VPopover.vue';\r
\r
const model = defineModel();\r
\r
const props = withDefaults(\r
  defineProps<{\r
    options?: ListboxInput<T>;\r
    disabled?: boolean;\r
    placeholder?: string;\r
    clearable?: boolean;\r
  }>(),\r
  {\r
    disabled: false,\r
  },\r
);\r
\r
const clickToClose = (e: Event, cb: () => void) =>\r
  !Array.isArray(model) &&\r
  e.target instanceof Element &&\r
  e.target.matches("[role='option']") &&\r
  cb();\r
\r
const spaceToClose = (_: Event, cb: () => void) =>\r
  !Array.isArray(model) && cb();\r
\r
const plugins: PopPlugin[] = [\r
  sameWidth,\r
  margin(5),\r
  flip({ margin: 5 }),\r
  maxHeight,\r
  applyTransform,\r
];\r
<\/script>\r
\r
<template>\r
  <VPopover trigger="click" animated trap :plugins>\r
    <template #default="{ open }">\r
      <div\r
        :tabindex="-disabled"\r
        class="VField VSelect"\r
        :aria-expanded="open"\r
        :aria-disabled="disabled"\r
      >\r
        <div data-trunk>Value: {{ model }}</div>\r
      </div>\r
    </template>\r
    <template #popper="pop">\r
      <div class="VActionSheet">\r
        <VListbox\r
          v-model="model"\r
          @click="(e: Event) => clickToClose(e, () => (pop.open = false))"\r
          @keydown.space.prevent="\r
            (e: Event) => spaceToClose(e, () => (pop.open = false))\r
          "\r
          :action="\r
            (_, listbox) => {\r
              listbox.input(listbox);\r
              spaceToClose(_, () => (pop.open = false));\r
            }\r
          "\r
          :magnetic="false"\r
          class="VSelectPicker"\r
          :options\r
        />\r
      </div>\r
    </template>\r
  </VPopover>\r
</template>\r
<style>\r
:where(.VSelect .VInputTrunk) {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
:where(.VSelect .VInputTrunk) {\r
  pointer-events: none;\r
}\r
\r
:where([data-trunk]::placeholder, [data-placeholder]) {\r
  color: var(--text-3);\r
  user-select: none;\r
}\r
\r
:where(.VSelect:not([aria-disabled='true']):hover) {\r
  outline-color: var(---main);\r
  cursor: pointer;\r
}\r
\r
:where(.VSelect:is(:focus-within, [aria-expanded='true'])) {\r
  outline: 2px solid var(---main);\r
}\r
\r
:where(.VSelect[aria-expanded='true']) {\r
  box-shadow: 0 0 0 4px var(---foam);\r
}\r
\r
.VSelectPicker {\r
  background-color: var(--mat-solid-0);\r
  outline: 0;\r
\r
  :where([role='option']) {\r
    display: flex;\r
    align-items: center;\r
    gap: 5px;\r
    height: var(---size);\r
    padding: 10px;\r
    font-size: var(---f);\r
    line-height: 1.6;\r
\r
    white-space: nowrap;\r
    /* text-overflow: ellipsis; unavailable */\r
    overflow: hidden;\r
\r
    &:where(:not([aria-disabled='true'])) {\r
      cursor: pointer;\r
    }\r
    &:where(:not([aria-disabled='true']):hover) {\r
      background-color: var(--mat-solid-1);\r
    }\r
    &:where(:not([aria-disabled='true']):active) {\r
      background-color: var(--mat-solid-2);\r
    }\r
    &:where([aria-selected='true']) {\r
      color: var(---ink);\r
      background: color-mix(in oklab, var(---foam), transparent 50%);\r
    }\r
    &:where([aria-selected='true']:not([aria-disabled='true']):hover) {\r
      background: color-mix(in oklab, var(---foam), transparent 25%);\r
    }\r
\r
    &:where([aria-selected='true']:not([aria-disabled='true']):active) {\r
      background: color-mix(in oklab, var(---foam), transparent 0%);\r
    }\r
  }\r
\r
  &:where(:focus-visible) :where([role='option'].current) {\r
    outline: 2px solid var(---main);\r
    outline-offset: -2px;\r
  }\r
\r
  :where([role='group'] > h6) {\r
    display: block;\r
    padding: 10px 10px 5px;\r
    font-size: 13px;\r
    line-height: 1.6;\r
    font-weight: 600;\r
  }\r
}\r
</style>\r
`;export{r as default};
