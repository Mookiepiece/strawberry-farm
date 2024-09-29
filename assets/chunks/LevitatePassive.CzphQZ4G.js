const r=`<script setup lang="ts">\r
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm/shared';\r
import { ref } from 'vue';\r
\r
const anchor = ref<HTMLElement>();\r
const pop = ref<HTMLElement>();\r
\r
const touched = ref(false);\r
\r
const changeDir = (_dir: any) => {\r
  touched.value = true;\r
\r
  levitate(anchor.value!, pop.value!, {\r
    dir: _dir,\r
    plugins: [applyTransform],\r
  });\r
};\r
<\/script>\r
\r
<template>\r
  <div style="position: relative">\r
    <div style="position: relative; height: 300px; width: 100%; overflow: auto">\r
      <div style="width: 500%; height: 1000px">\r
        <div ref="anchor" class="a 🍒"></div>\r
        <Teleport to="body">\r
          <div\r
            ref="pop"\r
            class="b 🍒"\r
            :style="!touched ? { clipPath: 'circle(0)' } : {}"\r
          >\r
            🍓\r
          </div>\r
        </Teleport>\r
      </div>\r
    </div>\r
    <div class="control (///)">\r
      <button @click="changeDir('top')">Top</button>\r
      <button @click="changeDir('right')">Right</button>\r
      <button @click="changeDir('bottom')">Bottom</button>\r
      <button @click="changeDir('left')">Left</button>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.a {\r
  width: 100px;\r
  height: 100px;\r
}\r
.b {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  padding: 10px;\r
  z-index: 1;\r
}\r
\r
.control {\r
  position: absolute;\r
  top: 100%;\r
  left: 100%;\r
  transform: translate(-100%, -100%);\r
  width: max-content;\r
  max-width: 100%;\r
}\r
</style>\r
`;export{r as default};
