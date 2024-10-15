const n=`<script setup lang="ts">\r
import { ref, watchEffect } from 'vue';\r
import {\r
  applyTransform,\r
  levitate,\r
  trap,\r
} from '@mookiepiece/strawberry-farm/shared';\r
import { onClickAway } from '@mookiepiece/strawberry-farm/html/onClickAway';\r
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
\r
watchEffect(onCleanup => {\r
  const $anc = anchor.value;\r
  const $pop = pop.value;\r
  if ($anc && $pop)\r
    onCleanup(\r
      onClickAway([$pop, $anc], () => {\r
        open.value = false;\r
      }),\r
    );\r
});\r
\r
watchEffect(onCleanup => {\r
  const $pop = pop.value;\r
  const $open = open.value;\r
  if ($open && $pop) {\r
    onCleanup(trap($pop, theif => anchor.value?.contains(theif)));\r
  }\r
});\r
<\/script>\r
\r
<template>\r
  <button\r
    ref="anchor"\r
    @click="toggle"\r
    @keydown.up.prevent="open = true"\r
    @keydown.down.prevent="open = true"\r
    @keydown.esc.prevent="open = false"\r
  >\r
    Anchor\r
  </button>\r
\r
  <Teleport to="body">\r
    <i tabindex="0" v-if="open" data-stencil />\r
    <Transition appear>\r
      <div\r
        v-if="open"\r
        ref="pop"\r
        data-pop\r
        class="pop-body 🍒 p-6"\r
        tabindex="-1"\r
        @keydown.esc.prevent="open = false"\r
      >\r
        <input />\r
        <input />\r
        <input />\r
      </div>\r
    </Transition>\r
    <i tabindex="0" v-if="open" data-stencil />\r
  </Teleport>\r
</template>\r
\r
<style scoped>\r
.pop-body {\r
  width: 150px;\r
  transition:\r
    transform 1s var(--curve-wave),\r
    opacity 1s var(--curve-wave);\r
\r
  &.v-enter-from,\r
  &.v-leave-to {\r
    transform: scale(0);\r
    opacity: 0;\r
  }\r
}\r
\r
[data-stencil] {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  pointer-events: none;\r
  clip-path: circle(0);\r
}\r
\r
input {\r
  width: 100%;\r
}\r
</style>\r
`;export{n as default};
