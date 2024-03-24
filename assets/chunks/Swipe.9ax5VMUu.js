const r=`<script setup lang="ts">\r
import { onMounted, ref } from 'vue';\r
import { trackPointer } from '@mookiepiece/strawberry-farm/functions';\r
\r
const elRef = ref<HTMLDivElement>();\r
const infoRef = ref<HTMLSpanElement>();\r
const container = ref<HTMLDivElement>();\r
\r
onMounted(() => {\r
  const [el, c] = [elRef.value, container.value];\r
  if (!el || !c) return;\r
\r
  trackPointer(el, e => {\r
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
  });\r
});\r
<\/script>\r
\r
<template>\r
  <div class="z [B] [CC] \\{+}" ref="container">\r
    <div ref="elRef" class="\\{+}"></div>\r
    <samp ref="infoRef" class="\\{*}/" :style="{ '--y': '10px' }">{}</samp>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.z {\r
  position: relative;\r
  min-height: 250px;\r
}\r
\r
.z,\r
.z div {\r
  box-shadow:\r
    inset -2px -2px 0 0 var(---main),\r
    inset 0 0 0 2px var(---flame);\r
  padding: 2px;\r
\r
  border-radius: 10px;\r
  touch-action: none;\r
}\r
\r
.z div {\r
  min-width: 50px;\r
  min-height: 50px;\r
}\r
</style>\r
`;export{r as default};
