const i=`<template>\r
  <div\r
    style="\r
      display: grid;\r
      grid-template: 100px 100px 100px / 1fr 1fr 1fr;\r
      gap: 20px;\r
    "\r
    class="f3"\r
  >\r
    <div></div>\r
    <div class="(///) [Y]">\r
      <div v-for="i of 3" class="🍒">{{ i }}</div>\r
    </div>\r
    <div></div>\r
\r
    <div class="(///) [X]">\r
      <div v-for="i of 3" class="🍒">{{ i }}</div>\r
    </div>\r
    <div></div>\r
    <div class="(///) [B]">\r
      <div v-for="i of 3" class="🍒">{{ i }}</div>\r
    </div>\r
\r
    <div>\r
      <div class="(///) [y]">\r
        <div v-for="i of 3" class="🍒">{{ i }}</div>\r
      </div>\r
      <div class="(///) [x]">\r
        <div v-for="i of 3" class="🍒">{{ i }}</div>\r
      </div>\r
      <div class="(///) [a]">\r
        <div v-for="i of 3" class="🍒">{{ i }}</div>\r
      </div>\r
      <div class="(///) [b]">\r
        <div v-for="i of 3" class="🍒">{{ i }}</div>\r
      </div>\r
    </div>\r
    <div class="(///) [A]">\r
      <div v-for="i of 3" class="🍒">{{ i }}</div>\r
    </div>\r
    <div></div>\r
  </div>\r
</template>\r
`;export{i as default};
