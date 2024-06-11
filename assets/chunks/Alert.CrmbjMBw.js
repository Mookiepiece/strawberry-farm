const r=`<script setup lang="ts">\r
import { ref } from 'vue';\r
\r
const a = ref<HTMLDivElement>();\r
const b = ref<HTMLDivElement>();\r
<\/script>\r
\r
<template>\r
  <div class="Alert f2">\r
    <i-feather i="x" class="f1" />\r
    <div class="px-1">\r
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis sit\r
      architecto vero quia explicabo debitis assumenda veniam, unde cum sed, at\r
      voluptates velit, sunt voluptas pariatur culpa quaerat dolor repellendus!\r
    </div>\r
  </div>\r
  <div class="AlertV2 mt-4">\r
    <i-feather i="shopping-bag" />\r
    <div clas="[A] gap-1">\r
      <div class="pb-1 fw6">Your Orders</div>\r
      <div class="f2 clr-2">Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.</div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.AlertV2 {\r
  position: relative;\r
  display: flex;\r
  align-items: flex-start;\r
  padding: 20px;\r
  padding-left: 40px;\r
  font-size: 15px;\r
  background: var(--mat-solid-1);\r
  border: 1px solid var(---main);\r
  border-radius: 6px;\r
\r
  > i-feather {\r
    position: absolute;\r
    top: 20px;\r
    left: 14px;\r
    color: var(---main);\r
    width: 1lh;\r
    aspect-ratio: 1;\r
  }\r
}\r
</style>\r
`;export{r as default};
