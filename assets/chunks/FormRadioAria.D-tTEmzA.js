const r=`<script setup lang="ts">\r
import { onMounted, ref, watchEffect } from 'vue';\r
import { on } from '../../strawberry-farm/shared';\r
\r
const radiogroup = ref<HTMLElement>();\r
\r
onMounted(() => {});\r
\r
watchEffect(onCleanup => {\r
  if (radiogroup.value) {\r
    onCleanup(on(radiogroup.value).keydown.Enter(() => {}));\r
    //\r
  }\r
});\r
<\/script>\r
\r
<template>\r
  <div role="radiogroup" ref="radiogroup" aria-label="TODO">\r
    <div\r
      role="radio"\r
      aria-checked="false"\r
      @keydown.enter="\r
        () => {\r
          (radiogroup?.closest('form') as HTMLFormElement).submit();\r
        }\r
      "\r
      tabindex=""\r
    >\r
      description\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
:where(.my-radio:focus-visible + div, .my-radio:not(:disabled) + div:hover) {\r
  background: #8884;\r
}\r
\r
:where(.my-radio:checked + div) {\r
  background: #8888;\r
}\r
</style>\r
`;export{r as default};
