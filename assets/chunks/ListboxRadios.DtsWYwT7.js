const r=`<script setup lang="ts" generic="T = any">\r
import {\r
  Listbox,\r
  ListboxLeaf,\r
  useListbox,\r
  UseListboxProps,\r
  VListbox,\r
} from '@mookiepiece/strawberry-farm';\r
\r
const model = defineModel<any>();\r
\r
const props = defineProps<\r
  Partial<UseListboxProps<T>> & { listbox?: Listbox<T> }\r
>();\r
\r
defineSlots<{\r
  default(scope: { option: ListboxLeaf<T> }): any;\r
}>();\r
\r
const listbox = props.listbox || useListbox<T>(model, props);\r
\r
defineExpose({ listbox });\r
<\/script>\r
\r
<template>\r
  <VListbox class="VRadios🩷" circular v-model="model" v-bind="props" v-slot="{ option }">\r
    <slot :option>\r
      <div data-trunk>\r
        {{ option.label }}\r
      </div>\r
    </slot>\r
  </VListbox>\r
</template>\r
\r
<style>\r
.VRadios🩷 :where([data-trunk]) {\r
  padding-inline: 15px;\r
}\r
\r
.VRadios🩷 {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 5px;\r
\r
  font-size: var(--f2);\r
  line-height: 1.6;\r
  outline: none;\r
\r
  :where([role='option']) {\r
    position: relative;\r
    display: flex;\r
    align-items: center;\r
\r
    min-height: 40px;\r
\r
    box-shadow:inset 0 0 0 1px var(--mat-solid-15);\r
    cursor: pointer;\r
    user-select: none;\r
\r
    &:where(:not([aria-disabled='true'])) {\r
      &:where(:hover) {\r
        background: var(--mat-solid-1);\r
      }\r
      &:where(:active) {\r
        background: var(--mat-solid-2);\r
      }\r
    }\r
\r
    &:where([aria-selected='true']) {\r
      color: var(--600);\r
      outline-offset: -1px;\r
      outline: 2px solid var(--500);\r
\r
      &:where(:not([aria-disabled='true'])) {\r
        &:where(:hover) {\r
          background: var(--100);\r
        }\r
        &:where(:active) {\r
          background: var(--200);\r
        }\r
      }\r
    }\r
\r
    &:where([aria-disabled='true']) {\r
      color: var(--text-3);\r
      background: var(--mat-solid-05);\r
      cursor: not-allowed;\r
    }\r
  }\r
}\r
\r
.VRadios🩷:where(:focus-visible)\r
  :where([role='option'].current) {\r
  box-shadow: 0 0 0 3px var(--mat-solid-0), 0 0 0 5px var(--500);\r
}\r
</style>\r
`;export{r as default};
