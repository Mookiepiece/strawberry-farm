const r=`<script setup lang="ts" generic="T = any">\r
import { computed } from 'vue';\r
import {\r
  VListbox,\r
  ListboxLeaf,\r
  ListboxGroup,\r
  Listbox,\r
  useListbox,\r
  UseListboxProps,\r
} from '../patterns';\r
\r
const model = defineModel();\r
\r
const props = defineProps<\r
  UseListboxProps<T> & {\r
    listbox?: Listbox<T>;\r
    action?(e: KeyboardEvent, listbox: Listbox): void;\r
  }\r
>();\r
\r
const slots = defineSlots<{\r
  default?(props: { option: ListboxLeaf<T> }): any;\r
  group?(props: { group: ListboxGroup<T> }): any;\r
}>();\r
\r
const listbox = props.listbox || useListbox(model, props);\r
\r
const magnetic = computed(() => !listbox.multi);\r
\r
defineExpose({ listbox });\r
<\/script>\r
\r
<template>\r
  <VListbox :listbox circular :magnetic class="VRadios">\r
    <template #default="scope">\r
      <slot v-bind="scope">\r
        <div data-trunk>\r
          {{ scope.option.label }}\r
        </div>\r
      </slot>\r
    </template>\r
    <template v-if="$slots.group" #group="scope">\r
      <slot name="group" v-bind="scope" />\r
    </template>\r
  </VListbox>\r
</template>\r
\r
<style>\r
.VRadios :where([data-trunk]) {\r
  padding-inline: 15px;\r
}\r
\r
.VRadios {\r
  &,\r
  :where([role='group']) {\r
    display: flex;\r
    flex-wrap: wrap;\r
    gap: 5px;\r
  }\r
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
    box-shadow: inset 0 0 0 1px var(--mat-solid-15);\r
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
\r
  :where([role='group'] > h6) {\r
    font-size: 13px;\r
    font-weight: 600;\r
    width: 100%;\r
  }\r
  :where([role='group']:not(:first-child) > h6) {\r
    margin-top: 10px;\r
  }\r
}\r
\r
.VRadios:where(:focus-visible) :where([role='option'].current) {\r
  box-shadow:\r
    0 0 0 3px var(--mat-solid-0),\r
    0 0 0 5px var(--500);\r
}\r
</style>\r
`;export{r as default};
