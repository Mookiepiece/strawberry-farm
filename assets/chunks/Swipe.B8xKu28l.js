const r=`<script setup lang="ts">\r
import { onMounted, ref } from 'vue';\r
import { Bag, swipe } from '@mookiepiece/strawberry-farm/functions';\r
\r
const elRef = ref<HTMLDivElement>();\r
const infoRef = ref<HTMLSpanElement>();\r
const container = ref<HTMLDivElement>();\r
\r
const bag = Bag();\r
onMounted(() => {\r
  const [el, c] = [elRef.value, container.value];\r
  if (!el || !c) return;\r
\r
  bag(\r
    swipe(el, e => {\r
      const start = { x: e.clientX, y: e.clientY };\r
      let relative = { x: 0, y: 0 };\r
\r
      return ({ e, done }) => {\r
        relative = {\r
          x: e.clientX - start.x,\r
          y: e.clientY - start.y,\r
        };\r
\r
        if (!done) {\r
          infoRef.value!.innerText = JSON.stringify(relative);\r
\r
          el.style.removeProperty('transition');\r
          el.style.setProperty(\r
            'transform',\r
            \`translate(\${relative.x}px,\${relative.y}px)\`,\r
          );\r
        } else {\r
          infoRef.value!.innerText = '{}';\r
\r
          el.style.setProperty('transform', \`translate(0px, 0px)\`);\r
          el.style.setProperty('transition', \`transform .3s\`);\r
        }\r
      };\r
    }),\r
  );\r
});\r
<\/script>\r
\r
<template>\r
  <div class="z [B] [CC]" ref="container">\r
    <div class="draggable 🍷" ref="elRef"></div>\r
    <samp ref="infoRef" :style="{ '--y': '10px' }">{}</samp>\r
  </div>\r
</template>\r
\r
<style scoped>\r
samp {\r
  position: absolute;\r
  top: 0;\r
}\r
\r
.z {\r
  position: relative;\r
  min-height: 250px;\r
  box-shadow: inset 0 0 0 2px var(---main);\r
  border-radius: 10px;\r
}\r
\r
.draggable {\r
  width: 50px;\r
  height: 50px;\r
  touch-action: none;\r
}\r
</style>\r
`;export{r as default};
