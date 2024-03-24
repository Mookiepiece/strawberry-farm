const r=`<script setup lang="ts">\r
import { ref } from 'vue';\r
\r
const colors = ref([\r
  'var(--mat-air-0)',\r
  'var(--mat-air-05)',\r
  'var(--mat-air-1)',\r
  'var(--mat-air-15)',\r
  'var(--mat-air-2)',\r
  'var(--mat-air-3)',\r
  'var(--mat-air-4)',\r
  'var(--mat-solid-0)',\r
  'var(--mat-solid-05)',\r
  'var(--mat-solid-1)',\r
  'var(--mat-solid-15)',\r
  'var(--mat-solid-2)',\r
  'var(--mat-solid-3)',\r
  'var(--mat-solid-4)',\r
]);\r
<\/script>\r
\r
<template>\r
  <div class="good f2" style="">\r
    <button\r
      class="mat:air [:-] p-3"\r
      v-for="c in colors"\r
      :style="{ background: c }"\r
    >\r
      {{ c }}\r
    </button>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  display: grid;\r
  grid-template: 40px / 1fr;\r
  gap: var(--3);\r
  justify-content: start;\r
}\r
\r
.tony {\r
  background: linear-gradient(\r
      70deg,\r
      var(---ink) 40px,\r
      var(---main) 41px,\r
      var(---main) 80px,\r
      var(---foam) 81px,\r
      var(---foam) 120px,\r
      transparent 121px\r
    ),\r
    linear-gradient(\r
      10deg,\r
      var(---ink) 30px,\r
      var(---main) 32px,\r
      var(---main) 50px,\r
      var(---foam) 52px,\r
      var(---foam) 70px,\r
      transparent 72px\r
    );\r
\r
  border-radius: var(--3);\r
  color: var(---ink);\r
  box-shadow: inset 0 0 0 var(--1);\r
\r
  padding: var(--2);\r
\r
  &::first-line {\r
    font-size: var(--f1);\r
  }\r
}\r
</style>\r
`;export{r as default};
