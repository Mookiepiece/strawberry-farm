const e=`<script setup lang="ts">\r
import { ref, watchEffect } from 'vue';\r
import { levitate } from '@mookiepiece/strawberry-farm/functions';\r
\r
const flip = levitate.plugins.flip();\r
\r
const open = ref(false);\r
const leaving = ref(false);\r
\r
const button = ref<HTMLElement>();\r
const popper = ref<HTMLDivElement>();\r
\r
watchEffect(onCleanup => {\r
  const $ref = button.value;\r
  const $popper = popper.value;\r
  const $open = open.value;\r
  if ($ref && $popper && $open) {\r
    onCleanup(\r
      levitate.auto($ref, () => {\r
        levitate($ref, $popper, { offset: 100 }, flip);\r
      }),\r
    );\r
  }\r
});\r
\r
const show = () => {\r
  if (!open.value) {\r
    open.value = true;\r
    leaving.value = true;\r
  } else {\r
    open.value = false;\r
  }\r
};\r
<\/script>\r
\r
<template>\r
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">\r
    <div style="width: 500%; height: 1000px">\r
      <button ref="button" class="sf-button mat:dusty" @click="show">\r
        Nike\r
      </button>\r
      <Teleport v-if="open || leaving" to="body">\r
        <div ref="popper" class="vp-demo-levitate-vue-animated-container (///)">\r
          <Transition appear @after-leave="leaving = false">\r
            <div v-show="open" class="vp-demo-levitate-vue-animated 🍒 p-6">\r
              Content\r
            </div>\r
          </Transition>\r
        </div>\r
      </Teleport>\r
    </div>\r
  </div>\r
</template>\r
\r
<style>\r
.vp-demo-levitate-vue-animated-container {\r
  position: fixed;\r
  left: 0;\r
  top: 0;\r
  z-index: 1;\r
}\r
\r
.vp-demo-levitate-vue-animated {\r
  width: 100px;\r
  transition: all 1s var(--curve-wave);\r
}\r
\r
.vp-demo-levitate-vue-animated.v-enter-from,\r
.vp-demo-levitate-vue-animated.v-leave-to {\r
  transform: translateX(200px);\r
  opacity: 0;\r
}\r
</style>\r
`;export{e as default};
