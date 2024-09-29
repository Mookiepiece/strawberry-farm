const r=`<script setup lang="ts">\r
import { trap } from '@mookiepiece/strawberry-farm/shared';\r
import { ref } from 'vue';\r
\r
const a = ref<HTMLElement>();\r
const b = ref<HTMLElement>();\r
const c = ref<HTMLElement>();\r
const d = ref<HTMLElement>();\r
\r
let releaseB = () => {};\r
const trapB = () => {\r
  releaseB = trap(b.value!);\r
};\r
\r
let releaseC = () => {};\r
const trapC = () => {\r
  releaseC = trap(c.value!);\r
};\r
\r
let releaseD = () => {};\r
const trapD = () => {\r
  releaseD = trap(d.value!);\r
};\r
<\/script>\r
\r
<template>\r
  <div class="table">\r
    <div class="tr">\r
      <button class="mat:solid">a</button>\r
      <button class="mat:solid">b</button>\r
      <button class="mat:solid" @click="trapB">-></button>\r
    </div>\r
    <div class="tr" ref="b" @keydown.esc="releaseB">\r
      <button class="mat:solid">a</button>\r
      <button class="mat:solid">b</button>\r
      <button class="mat:solid" @click="trapC">-></button>\r
    </div>\r
    <div class="tr" ref="c" @keydown.esc="releaseC">\r
      <button class="mat:solid">a</button>\r
      <button class="mat:solid">b</button>\r
      <button class="mat:solid" @click="trapD">-></button>\r
    </div>\r
    <div class="tr" ref="d" @keydown.esc="releaseD">\r
      <button class="mat:solid">a</button>\r
      <button class="mat:solid">b</button>\r
      <button class="mat:solid">c</button>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.table {\r
  display: grid;\r
  max-width: 300px;\r
  gap: 5px;\r
}\r
.tr {\r
  display: grid;\r
  grid: 1fr /1fr 1fr 1fr;\r
  gap: 5px;\r
}\r
\r
button {\r
  padding: 10px;\r
}\r
</style>\r
`;export{r as default};
