const n=`<script setup lang="ts">\r
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm/shared';\r
import { ref, watchEffect } from 'vue';\r
\r
const anchor = ref<HTMLElement>();\r
const pop = ref<HTMLElement>();\r
\r
const dir = ref<'top' | 'left' | 'right' | 'bottom'>('bottom');\r
\r
const positioning = () => {\r
  levitate(anchor.value!, pop.value!, {\r
    dir: dir.value,\r
    plugins: [applyTransform],\r
  });\r
};\r
\r
watchEffect(\r
  onCleanup =>\r
    anchor.value && onCleanup(levitate.auto(anchor.value, positioning)),\r
);\r
\r
const changeDir = (_dir: 'top' | 'left' | 'right' | 'bottom') => {\r
  dir.value = _dir;\r
  positioning();\r
};\r
<\/script>\r
\r
<template>\r
  <div style="position: relative">\r
    <div style="position: relative; height: 300px; width: 100%; overflow: auto">\r
      <div style="width: 500%; height: 1000px">\r
        <div ref="anchor" class="a 🍒"></div>\r
        <Teleport to="body">\r
          <div ref="pop" class="b 🍒">🍓</div>\r
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
`;export{n as default};
