const r=`<template>\r
  <div class="good [A] (///)">\r
    <div v-for="i in 8" class="i f3" :style="\`width: var(--\${i});\`" :aria-label="''+i"></div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good  {\r
  gap: 2px;\r
}\r
.i {\r
  position: relative;\r
  height: 30px;\r
  background: var(--tone-rasp);\r
\r
  &::after {\r
    position: absolute;\r
    right: -10px;\r
    top: 50%;\r
    content: attr(aria-label);\r
    transform: translate(100%, -50%);\r
  }\r
}\r
</style>\r
`;export{r as default};
