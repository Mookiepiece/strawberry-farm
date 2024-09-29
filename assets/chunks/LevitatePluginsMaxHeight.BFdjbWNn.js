const n=`<script setup lang="ts">\r
import {\r
  applyTransform,\r
  autoPlacement,\r
  levitate,\r
  margin,\r
  maxHeight,\r
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
      levitate.auto([$ref, $pop], () => {\r
        levitate($ref, $pop, {\r
          plugins: [\r
            margin(15),\r
            autoPlacement({ margin: 15 }),\r
            maxHeight,\r
            applyTransform,\r
          ],\r
        });\r
      }),\r
    );\r
  }\r
});\r
\r
const count = ref(100);\r
<\/script>\r
\r
<template>\r
  <button ref="anc" @click="open = !open">Max Height</button>\r
  <Teleport to="body">\r
    <span ref="pop" v-if="open" data-pop class="(///) p-6 grid">\r
      <input type="number" v-model="count" />\r
      <span class="🍒" v-for="i in Math.max(0, count)">{{ i }}</span>\r
    </span>\r
  </Teleport>\r
</template>\r
\r
<style scoped>\r
.grid {\r
  display: flex;\r
  flex-direction: row;\r
  flex-wrap: wrap;\r
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r
  gap: 20px;\r
  outline: 2px solid;\r
}\r
</style>\r
`;export{n as default};
