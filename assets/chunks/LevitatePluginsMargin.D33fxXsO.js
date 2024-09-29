const n=`<script setup lang="ts">\r
import {\r
  applyTransform,\r
  levitate,\r
  margin,\r
} from '@mookiepiece/strawberry-farm/shared';\r
import { ref, watchEffect } from 'vue';\r
\r
const open = ref(false);\r
\r
const anc = ref<HTMLElement>();\r
const pop = ref<HTMLElement>();\r
\r
watchEffect(onCleanup => {\r
  const [$ref, $pop, $open] = [anc.value, pop.value, open.value];\r
  if ($ref && $pop && $open) {\r
    onCleanup(\r
      levitate.auto($ref, () => {\r
        levitate($ref, $pop, { plugins: [margin(15), applyTransform] });\r
      }),\r
    );\r
  }\r
});\r
<\/script>\r
\r
<template>\r
  <button ref="anc" @click="open = !open">Reference</button>\r
  <Teleport to="body">\r
    <span ref="pop" v-if="open" data-pop class="🍒">🍒</span>\r
  </Teleport>\r
</template>\r
`;export{n as default};
