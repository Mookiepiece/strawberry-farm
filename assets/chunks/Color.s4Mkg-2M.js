const n=`<template>\r
  <div class="good f2" style="">\r
    <div class="tony tone-rasp [-:]">{{ ['山莓', 'Rasp'].join('\\n') }}</div>\r
    <div class="tony tone-iris [-:]">{{ ['鸢尾', 'Iris'].join('\\n') }}</div>\r
    <div class="tony tone-citrus [-:]">{{ ['枳果', 'Citrus'].join('\\n') }}</div>\r
    <div class="tony tone-reimu [-:]">{{ ['灵梦', 'Reimu'].join('\\n') }}</div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  display: grid;\r
  grid: auto-flow 110px / repeat(auto-fill, minmax(150px, 1fr));\r
  gap: 15px;\r
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
      var(---ink) 50px,\r
      var(---main) 52px,\r
      var(---main) 70px,\r
      var(---foam) 72px,\r
      var(---foam) 90px,\r
      transparent 92px\r
    );\r
\r
  border-radius: 5px;\r
  color: var(---ink);\r
  box-shadow: inset 0 0 0 5px;\r
\r
  padding: 10px;\r
\r
  &::first-line {\r
    font-size: var(--f1);\r
  }\r
}\r
</style>\r
`;export{n as default};
