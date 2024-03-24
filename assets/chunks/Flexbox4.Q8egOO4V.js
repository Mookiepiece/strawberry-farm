const i=`<template>\r
  <div\r
    style="\r
      display: grid;\r
      grid: auto-flow 150px / repeat(auto-fill, minmax(100px,1fr));\r
      gap: 20px;\r
    "\r
  >\r
    <div class="(///) [B] [FS] [[+S]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
    <div class="(///) [B] [FS] [[+C]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
    <div class="(///) [B] [FS] [[+E]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
    <div class="(///) [B] [C2] [[-0]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
    <div class="(///) [B] [C2] [[-1]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
    <div class="(///) [B] [C2] [[-2]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
    <div class="(///) [B] [C2] [[+F]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
    <div class="(///) [B] [E2] [[+F]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
    <div class="(///) [B] [F2] [[+F]]">\r
      <div v-for="i of 5" class="🍒">{{ i }}</div>\r
    </div>\r
  </div>\r
</template>\r
<style scoped>\r
.🍒 {\r
  &:not(:last-child) {\r
    width: 25%;\r
  }\r
\r
  &:last-child {\r
    width: 100%;\r
  }\r
}\r
</style>\r
`;export{i as default};
