const n=`<script setup lang="ts">\r
import { Bag, levitate } from '@mookiepiece/strawberry-farm/functions';\r
import { onUnmounted, ref } from 'vue';\r
import { onMounted } from 'vue';\r
\r
const a = ref<HTMLElement>();\r
const b = ref<HTMLElement>();\r
\r
let bag = Bag();\r
onUnmounted(bag);\r
\r
const dirRef = ref<'top' | 'left' | 'right' | 'bottom'>('bottom');\r
\r
onMounted(() => {\r
  bag(levitate.auto(a.value!, update));\r
});\r
\r
const update = () => {\r
  levitate(a.value!, b.value!, { dir: dirRef.value }, levitate.plugins.flip());\r
};\r
\r
const changeDir = (dir: 'top' | 'left' | 'right' | 'bottom') => {\r
  dirRef.value = dir;\r
  update();\r
};\r
<\/script>\r
\r
<template>\r
  <div style="position: relative">\r
    <div style="position: relative; height: 300px; width: 100%; overflow: auto">\r
      <div style="width: 500%; height: 1000px">\r
        <div ref="a" class="a"></div>\r
        <Teleport to="body">\r
          <div ref="b" class="b 🍒">lorem</div>\r
        </Teleport>\r
      </div>\r
    </div>\r
    <div\r
      style="\r
        position: absolute;\r
        top: 100%;\r
        left: 100%;\r
        transform: translate(-100%, -100%);\r
        width: max-content;\r
        max-width: 100%;\r
      "\r
    >\r
      <button @click="update">Place</button>\r
      <br />\r
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
  color: var(--black-text1);\r
  background-color: #def;\r
}\r
.b {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  padding: 10px;\r
  z-index: 1;\r
}\r
</style>\r
`;export{n as default};
