const r=`<script setup lang="ts" generic="T = any">\r
import { computed, ref, watchEffect } from 'vue';\r
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
const ready = ref(false);\r
const root = ref();\r
watchEffect(\r
  () => {\r
    listbox.model;\r
    const wrap = root.value?.$el as HTMLElement | undefined;\r
    if (!wrap) return;\r
    const optionEl = wrap.querySelector<HTMLElement>(\r
      "[role='option'][aria-selected='true']",\r
    );\r
    if (!optionEl) return;\r
    const [l, w] = [optionEl.offsetLeft, optionEl.offsetWidth];\r
    wrap.style.setProperty('--v-seg-l', l + 'px');\r
    wrap.style.setProperty('--v-seg-w', w + 'px');\r
\r
    requestAnimationFrame(() => {\r
      requestAnimationFrame(() => {\r
        ready.value = true;\r
      });\r
    });\r
  },\r
  { flush: 'post' },\r
);\r
\r
defineExpose({ listbox });\r
<\/script>\r
\r
<template>\r
  <VListbox\r
    :listbox\r
    circular\r
    :magnetic\r
    class="VSegmented"\r
    :class="[ready && '--ready']"\r
    ref="root"\r
  >\r
    <template #default="props">\r
      <slot v-bind="props">\r
        <div data-trunk>\r
          {{ props.option.label }}\r
        </div>\r
      </slot>\r
    </template>\r
    <template v-if="$slots.group" #default="props">\r
      <slot v-bind="props" />\r
    </template>\r
  </VListbox>\r
</template>\r
\r
<style>\r
.VSegmented :where([data-trunk]) {\r
  padding-inline: 15px;\r
}\r
\r
.VSegmented {\r
  position: relative;\r
  display: inline-flex;\r
\r
  font-size: var(---f);\r
  line-height: 1.6;\r
  outline: none;\r
  border: 1px solid var(--mat-solid-1);\r
  background: var(--mat-solid-1);\r
\r
  --v-seg-l: 0;\r
  --v-seg-w: 0;\r
\r
  :where([role='option']) {\r
    position: relative;\r
    display: flex;\r
    align-items: center;\r
\r
    min-height: 40px;\r
\r
    color: var(--text-2);\r
    cursor: pointer;\r
    user-select: none;\r
\r
    &:where(:not([aria-disabled='true']):not([aria-selected='true'])) {\r
      &:where(:hover) {\r
        color: var(--text-1);\r
        background: var(--mat-solid-2);\r
      }\r
      &:where(:active) {\r
        background: var(--mat-solid-3);\r
      }\r
    }\r
\r
    &:where([aria-selected='true']) {\r
      color: var(--600);\r
      cursor: default;\r
    }\r
\r
    &:where([aria-disabled='true']) {\r
      color: var(--text-3);\r
      cursor: not-allowed;\r
    }\r
  }\r
}\r
\r
.VSegmented::before {\r
  position: absolute;\r
  left: var(--v-seg-l);\r
  width: calc(var(--v-seg-w) - 2px);\r
  height: calc(100% - 2px);\r
  background: var(--mat-solid-0);\r
  transform: translate(1px, 1px);\r
  content: '';\r
}\r
\r
.VSegmented.--ready::before {\r
  transition: all 0.2s var(--curve-wave);\r
}\r
\r
.VSegmented:where(:focus-visible) {\r
  outline: 2px solid var(--500);\r
}\r
</style>\r
`;export{r as default};
