const r=`<script setup lang="ts">\r
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm/shared';\r
import { ref } from 'vue';\r
\r
const anchor = ref<HTMLElement>();\r
const pop = ref<HTMLElement>();\r
\r
const visible = ref(false);\r
\r
const changeDir = (_dir: any) => {\r
  visible.value = !visible.value;\r
\r
  levitate(anchor.value!, pop.value!, {\r
    dir: _dir,\r
    plugins: [applyTransform],\r
  });\r
};\r
<\/script>\r
\r
<template>\r
  <div ref="anchor" class="reference 🍒" />\r
  <Teleport to="body">\r
    <div\r
      ref="pop"\r
      class="floating 🍒"\r
      :style="!visible ? { clipPath: 'circle(0)' } : {}"\r
    >\r
      🍓\r
    </div>\r
  </Teleport>\r
  <button @click="changeDir('top')">Top</button>\r
</template>\r
\r
<style scoped>\r
.reference {\r
  width: 100px;\r
  height: 100px;\r
}\r
.floating {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  padding: 10px;\r
  z-index: 1;\r
}\r
</style>\r
`;export{r as default};
