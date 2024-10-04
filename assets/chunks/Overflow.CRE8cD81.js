const r=`<script setup lang="ts">\r
defineProps<{\r
  i: number;\r
}>();\r
<\/script>\r
\r
<template>\r
  <div class="a" :class="{ noscrollbar: i === 2 }">\r
    <div v-for="i in 5" class="b 🦄"></div>\r
  </div>\r
</template>\r
\r
<style>\r
.noscrollbar {\r
  scrollbar-width: none;\r
}\r
\r
.noscrollbar::-webkit-scrollbar {\r
  width: 0;\r
  height: 0;\r
}\r
</style>\r
\r
<style scoped>\r
.a {\r
  position: relative;\r
  display: flex;\r
  overflow: auto;\r
  scroll-snap-type: x mandatory;\r
}\r
\r
.a::after {\r
  content: 'Mouse Not Available';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
}\r
@media (any-pointer: fine) {\r
  .a::after {\r
    content: 'Mouse Available';\r
  }\r
}\r
\r
.b {\r
  scroll-snap-align: center;\r
  flex: 0 0 100%;\r
  height: 300px;\r
}\r
</style>\r
`;export{r as default};
