const n=`<script setup lang="ts">\r
import { ref, watchEffect } from 'vue';\r
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm';\r
\r
const open = ref(false);\r
\r
const anc = ref<HTMLElement>();\r
const pop = ref<HTMLDivElement>();\r
\r
watchEffect(onCleanup => {\r
  const [$anc, $pop, $open] = [anc.value, pop.value, open.value];\r
  if ($anc && $pop && $open) {\r
    onCleanup(\r
      levitate.auto($anc, () => {\r
        levitate($anc, $pop, { plugins: [applyTransform] });\r
      }),\r
    );\r
  }\r
});\r
<\/script>\r
\r
<template>\r
  <button ref="anc" @click="open = !open">Reference</button>\r
  <Teleport to="body">\r
    <div v-if="open" ref="pop" class="levitated (///)">Content</div>\r
  </Teleport>\r
</template>\r
\r
<style scoped>\r
.levitated {\r
  position: fixed;\r
  left: 0;\r
  top: 0;\r
}\r
</style>\r
`;export{n as default};
