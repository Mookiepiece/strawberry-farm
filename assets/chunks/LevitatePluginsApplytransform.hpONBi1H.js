const n=`<script setup lang="ts">\r
import { levitate, PopPlugin } from '@mookiepiece/strawberry-farm/shared';\r
import { ref, watchEffect } from 'vue';\r
\r
const open = ref(false);\r
\r
const anc = ref<HTMLElement>();\r
const pop = ref<HTMLElement>();\r
\r
const applyTransformPro: PopPlugin = config => {\r
  [\r
    pop.value!,\r
    pop.value!.nextElementSibling as HTMLElement,\r
    pop.value!.nextElementSibling!.nextElementSibling as HTMLElement,\r
  ].forEach((el , index) => {\r
    el?.style.setProperty(\r
      'transform',\r
      \`translate(\${config.x! + index * 10 + 'px'}, \${config.y! + index * 10 + 'px'})\`,\r
    );\r
  });\r
\r
  return config;\r
};\r
applyTransformPro.post = true;\r
\r
watchEffect(onCleanup => {\r
  const [$ref, $pop, $open] = [anc.value, pop.value, open.value];\r
  if ($ref && $pop && $open) {\r
    onCleanup(\r
      levitate.auto($ref, () => {\r
        levitate($ref, $pop, { plugins: [applyTransformPro] });\r
      }),\r
    );\r
  }\r
});\r
<\/script>\r
\r
<template>\r
  <button ref="anc" @click="open = !open">Apply Transform</button>\r
  <Teleport to="body">\r
    <span ref="pop" v-if="open" class="b">🍒</span>\r
    <span v-if="open" class="b">🍓</span>\r
    <span v-if="open" class="b">🍇</span>\r
  </Teleport>\r
</template>\r
\r
<style scoped>\r
.b {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
}\r
</style>\r
`;export{n as default};
