const e=`<script setup lang="ts">\r
import { ref } from 'vue';\r
\r
const model = defineModel();\r
\r
defineProps<{\r
  disabled?: boolean;\r
}>();\r
\r
const toggle = () => (model.value = !model.value);\r
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
    @keydown.enter="toggle"\r
    @keydown.space="toggle"\r
  >\r
    <slot />\r
    <div class="VSwitchIndicator"></div>\r
  </div>\r
</template>\r
`;export{e as default};
