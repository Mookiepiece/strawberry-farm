const i=`<template>\r
  <div class="(///) [B] [SS]">\r
    <div v-for="i of 3" :style="{ '--i': i }" class="🍒">{{ i }}</div>\r
  </div>\r
  <div class="(///) [B] [CS]">\r
    <div v-for="i of 3" :style="{ '--i': i }" class="🍒">{{ i }}</div>\r
  </div>\r
  <div class="(///) [B] [ES]">\r
    <div v-for="i of 3" :style="{ '--i': i }" class="🍒">{{ i }}</div>\r
  </div>\r
  <div class="(///) [B] [FS]">\r
    <div v-for="i of 3" :style="{ '--i': i }" class="🍒">{{ i }}</div>\r
  </div>\r
  <div class="(///) [B] [BS]">\r
    <div v-for="i of 3" :style="{ '--i': i }" class="🍒">{{ i }}</div>\r
  </div>\r
</template>\r
<style scoped>\r
.\\(\\/\\/\\/\\) + .\\(\\/\\/\\/\\) {\r
  margin-top: 10px;\r
}\r
\r
.🍒 {\r
  font-size: calc(1.2em * var(--i));\r
  line-height: 1;\r
}\r
\r
.🍒 {\r
  min-width: 50px;\r
  min-height: 50px;\r
}\r
</style>\r
`;export{i as default};
