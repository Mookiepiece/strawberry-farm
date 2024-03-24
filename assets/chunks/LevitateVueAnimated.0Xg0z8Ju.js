const n=`<script setup lang="ts">\r
import { onBeforeUnmount, ref, watch } from 'vue';\r
import { Bag, levitate } from '@mookiepiece/strawberry-farm/functions';\r
\r
const open = ref(false);\r
const leaving = ref(false);\r
\r
const button = ref<Element>();\r
const popper = ref<HTMLDivElement>();\r
\r
const bag = Bag();\r
onBeforeUnmount(bag);\r
\r
const flip = levitate.plugins.flip()\r
\r
watch(\r
  () => [popper.value, open.value] as const,\r
  ([el, open]) => {\r
    bag();\r
    if (open && el) {\r
      bag(\r
        levitate.auto(button.value!, () => {\r
          levitate(button.value!, el, {\r
            offset: 10,\r
          }, flip);\r
        }),\r
      );\r
    }\r
  },\r
);\r
\r
const toggle = () => {\r
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
      <button ref="button" class="sf-button mat:dusty" @click="toggle">Nike</button>\r
      <Teleport v-if="open || leaving" to="body">\r
        <div ref="popper" class="vp-demo-levitate-vue-animated-container fixed (///)">\r
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
\r
</style>\r
`;export{n as default};
