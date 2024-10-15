const r=`<script setup lang="ts">\r
import { h, isVNode, ref } from 'vue';\r
import { requestSubmit } from '../html';\r
const model = defineModel();\r
\r
defineProps<{\r
  label?: any;\r
  disabled?: boolean;\r
}>();\r
\r
defineSlots<{\r
  default?(scope: { indicator: () => any }): any;\r
}>();\r
\r
const toggle = () => (model.value = !model.value);\r
\r
const indicator = () => h('div', { class: 'VSwitchIndicator' });\r
\r
const el = ref<HTMLDivElement>();\r
defineExpose({ el });\r
<\/script>\r
\r
<template>\r
  <div\r
    :tabindex="disabled ? '-1' : '0'"\r
    class="VSwitch"\r
    role="button"\r
    :aria-disabled="disabled"\r
    :aria-pressed="model ? 'true' : 'false'"\r
    @click="toggle"\r
    @keydown.exact.enter.prevent="requestSubmit"\r
    @keydown.exact.space.prevent="toggle"\r
  >\r
    <slot :indicator>\r
      <component\r
        :is="label"\r
        v-if="typeof label == 'function' || isVNode(label)"\r
      />\r
      <span v-else>{{ label }}</span>\r
      <div class="VSwitchIndicator"></div>\r
    </slot>\r
  </div>\r
</template>\r
<style>\r
.VSwitch {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  font-size: var(---f);\r
  line-height: 1.6;\r
  outline: none;\r
\r
  &:where(:not([aria-disabled='true'])) {\r
    cursor: pointer;\r
  }\r
\r
  :where(.VSwitchIndicator) {\r
    position: relative;\r
    display: flex;\r
    align-items: center;\r
    width: var(---size);\r
    height: calc(var(---size) * 0.55);\r
\r
    background: var(--mat-solid-2);\r
    border-radius: 999px;\r
\r
    transition:\r
      transform 0.2s var(--curve-wave),\r
      background 0.2s var(--curve-wave);\r
\r
    &::before {\r
      display: block;\r
      width: calc(var(---size) * 0.55 - 8px);\r
      aspect-ratio: 2;\r
      background: white;\r
      border-radius: 999px;\r
      content: '';\r
      transition:\r
        aspect-ratio 0.2s var(--curve-wave),\r
        transform 0.2s var(--curve-wave);\r
      transform: translateX(4px) scale(0.7);\r
    }\r
  }\r
\r
  &:where(:focus-visible) .VSwitchIndicator {\r
    outline: 2px solid var(---main);\r
    outline-offset: 1px;\r
  }\r
\r
  &:where([aria-pressed='true']) .VSwitchIndicator {\r
    background: var(---main);\r
    &::before {\r
      aspect-ratio: 1;\r
      transform: translateX(calc(var(---size) * 0.45 + 4px));\r
    }\r
  }\r
\r
  &:where(:hover) .VSwitchIndicator {\r
    box-shadow: inset 0 2px 1px #0001;\r
\r
    &::before {\r
      box-shadow: 0 1px 3px -1px #000a;\r
    }\r
  }\r
  &:where([aria-pressed='true']:hover) .VSwitchIndicator {\r
    box-shadow: inset 0 2px 1px #0004;\r
\r
    &::before {\r
      box-shadow: 0 1px 3px -1px #000f;\r
    }\r
  }\r
}\r
</style>\r
`;export{r as default};
