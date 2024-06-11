const r=`<template>\r
  <div class="😊">\r
    <nav>\r
      <div class="[-:] sc w0" style="--w: 393; --r: 0.55">393</div>\r
      <div class="[-:] bk w1" style="--w: 444">444</div>\r
      <div class="[-:] bk w2" style="--w: 700">700</div>\r
      <div class="[-:] sc w2" style="--w: 768; --r: 0.75">768</div>\r
      <div class="[-:] bk w3" style="--w: 1000; -">1000</div>\r
      <div class="[-:] sc w3" style="--w: 1024; --r: 1.33">1024</div>\r
      <div class="[-:] bk w4" style="--w: 1300">1300</div>\r
      <div class="[-:] sc w4" style="--w: 1366; --r: 1.77">1366</div>\r
      <div class="[-:] bk w5" style="--w: 1700">1700</div>\r
      <div class="[-:] sc w5" style="--w: 1920; --r: 1.77">1920</div>\r
      <div class="[-:] sc w5" style="--w: 2560; --r: 1.77">2560</div>\r
      <div class="[-:] bk" style="--w: 2560"></div>\r
    </nav>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
.😊 {\r
  position: relative;\r
  margin: 25px 0;\r
  aspect-ratio: 1.77;\r
  user-select: none;\r
\r
  nav div {\r
    position: absolute;\r
    left: 0;\r
    bottom: 0;\r
    width: calc(100% / 2560 * var(--w));\r
    aspect-ratio: var(--r);\r
    font: 600 12px/20px sans-serif;\r
    white-space: nowrap;\r
    box-shadow: 0 0 0 2px inset;\r
    padding: 4px;\r
    line-height: 1;\r
\r
    &.bk {\r
      height: 20px;\r
    }\r
\r
    // &.w0 {\r
    //   color: #555;\r
    // }\r
    // &.w1 {\r
    //   color: #aaa;\r
    // }\r
    &.w2 {\r
      color: #85e;\r
    }\r
    &.w3 {\r
      color: #85e;\r
    }\r
    &.w4 {\r
      color: #c24;\r
    }\r
    &.w5 {\r
      color: #c24;\r
    }\r
  }\r
}\r
</style>\r
`;export{r as default};
