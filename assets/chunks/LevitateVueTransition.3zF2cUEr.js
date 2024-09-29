const n=`<script setup lang="ts">\r
import { ref, watchEffect } from 'vue';\r
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm/shared';\r
\r
const open = ref(false);\r
\r
const anchor = ref<HTMLElement>();\r
const pop = ref<HTMLDivElement>();\r
\r
watchEffect(onCleanup => {\r
  const [$anc, $pop, $open] = [anchor.value, pop.value, open.value];\r
  if ($anc && $pop && $open) {\r
    onCleanup(\r
      levitate.auto($anc, () => {\r
        levitate($anc, $pop, { plugins: [applyTransform] });\r
      }),\r
    );\r
  }\r
});\r
\r
const toggle = () => (open.value = !open.value);\r
<\/script>\r
\r
<template>\r
  <button ref="anchor" @click="toggle">Reference</button>\r
  <Teleport to="body">\r
    <Transition appear>\r
      <div v-if="open" ref="pop" class="pop pop-body 🍒 p-6">Content</div>\r
    </Transition>\r
  </Teleport>\r
</template>\r
\r
<style scoped>\r
.pop {\r
  position: fixed;\r
  left: 0;\r
  top: 0;\r
}\r
\r
.pop-body {\r
  width: 100px;\r
  transition:\r
    transform 1s var(--curve-wave),\r
    opacity 1s var(--curve-wave);\r
\r
  &.v-enter-from,\r
  &.v-leave-to {\r
    transform: translateX(200px);\r
    opacity: 0;\r
  }\r
}\r
</style>\r
`;export{n as default};
