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
let $anc: any = {};\r
const show = (e: MouseEvent) => {\r
  const { clientX: x, clientY: y } = e;\r
  $anc = {\r
    getBoundingClientRect: (): DOMRect => ({\r
      x,\r
      y,\r
      top: y,\r
      left: x,\r
      width: 1,\r
      height: 1,\r
      bottom: y + 1,\r
      right: x + 1,\r
      toJSON() {},\r
    }),\r
    setAttribute() {},\r
    offsetWidth: 1,\r
    offsetHeight: 1,\r
    clientWidth: 1,\r
    clientHeight: 1,\r
    scrollWidth: 1,\r
    scrollHeight: 1,\r
  };\r
  open.value = true;\r
};\r
\r
watchEffect(() => {\r
  const [$pop, $open] = [pop.value, open.value];\r
  if ($pop && $open) {\r
    levitate($anc, $pop, {\r
      dir: 'right',\r
      align: 'start',\r
      plugins: [applyTransform],\r
    });\r
  }\r
});\r
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
    onCleanup(trap($pop, theif => theif !== anchor.value));\r
  }\r
});\r
<\/script>\r
\r
<template>\r
  <button ref="anchor" @contextmenu.prevent="show">Anchor</button>\r
\r
  <Teleport to="body">\r
    <i tabindex="0" v-if="open" data-stencil />\r
    <Transition appear>\r
      <div\r
        v-if="open"\r
        ref="pop"\r
        data-pop\r
        data-ctx-menu\r
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
