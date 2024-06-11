const r=`<script setup>\r
const classes = [\r
  ['h1-1', 'h1', 'h1-3'],\r
  ['h2-1', 'h2', 'h2-3'],\r
  ['h3-1', 'h3', 'h3-3'],\r
  ['f1-1', 'f1', 'f1-3'],\r
  ['f2-1', 'f2', 'f2-3'],\r
  ['f3-1', 'f3', 'f3-3'],\r
].flat();\r
<\/script>\r
\r
<template>\r
  <div class="good">\r
    <div class="t (///)" v-for="i of classes" :class="[i]">\r
      <span class="fw6">{{ i }}</span> IS\r
      <span class="fw3">AWESOME</span>\r
    </div>\r
  </div>\r
</template>\r
<style scoped>\r
.good {\r
  display: grid;\r
  grid: auto-flow /  1fr;\r
  place-items: start start;\r
  gap: 10px;\r
}\r
\r
@media (min-width: 700px) {\r
  .good {\r
  grid: auto-flow / 1fr 1fr 1fr;\r
  }\r
}\r
\r
.t {\r
  box-shadow: 0 0 0 1px var(--DVD);\r
}\r
</style>\r
`;export{r as default};
