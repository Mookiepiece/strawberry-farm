const r=`<template>\r
  <div class="good f2" style="">\r
    <div class="tony tone:rasp [-:]">{{ ['山莓', 'Rasp'].join('\\n') }}</div>\r
    <div class="tony tone:iris [-:]">{{ ['鸢尾', 'Iris'].join('\\n') }}</div>\r
    <div class="tony tone:citrus [-:]">{{ ['枳果', 'Citrus'].join('\\n') }}</div>\r
    <div class="tony tone:reimu [-:]">{{ ['灵梦', 'Reimu'].join('\\n') }}</div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  display: grid;\r
  grid: auto-flow 110px / repeat(auto-fill, minmax(150px, 1fr));\r
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
      var(---flame) 81px,\r
      var(---flame) 120px,\r
      var(---foam) 121px,\r
      var(---foam) 160px,\r
      transparent 161px\r
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
  border-radius: var(--1);\r
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
