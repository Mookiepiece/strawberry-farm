const r=`<template>\r
  <div class="levitate-algo">\r
    <div class="window">\r
      ViewPort\r
      <div class="anchor">Anchor</div>\r
      <div class="map">Map (Dir: bottom)</div>\r
      <div class="map map2">Map (Margin: 30)</div>\r
      <div class="pop">Pop (Margin: 30, Align: start)</div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.levitate-algo {\r
  overflow: auto;\r
  font-weight: 600;\r
\r
  .window {\r
    position: relative;\r
    margin: auto;\r
    width: 500px;\r
    height: 300px;\r
    padding-top: 20px;\r
    color: #f88;\r
    background: 0 0 / 20px 20px\r
      repeating-linear-gradient(\r
        45deg,\r
        #f883 0,\r
        #f883 2px,\r
        #0000 2px,\r
        #0000 10px\r
      );\r
    background-clip: content-box;\r
    border: 2px solid #8888;\r
    box-shadow: var(--shadow);\r
    overflow: hidden;\r
    border-radius: 20px;\r
    &::before {\r
      display: block;\r
      position: absolute;\r
      top: 0;\r
      left: 0;\r
      right: 0;\r
      height: 20px;\r
      background: #8888;\r
      content: '';\r
    }\r
  }\r
\r
  .anchor {\r
    position: absolute;\r
    top: calc(50% - 20px);\r
    left: calc(50% - 40px);\r
    width: 80px;\r
    height: 40px;\r
    color: #88f;\r
    border: 1px solid;\r
    background: 0 0 / 20px 20px\r
      repeating-linear-gradient(\r
        -45deg,\r
        #88f3 0,\r
        #88f3 2px,\r
        #0000 2px,\r
        #0000 10px\r
      );\r
  }\r
  .map {\r
    position: absolute;\r
    top: calc(50% + 20px);\r
    left: 0;\r
    right: 0;\r
    bottom: 0;\r
    color: #6a8;\r
    border: 1px solid;\r
    background: 0 0 / 20px 30px\r
      repeating-linear-gradient(\r
        -45deg,\r
        #6a83 0,\r
        #6a83 2px,\r
        #0000 2px,\r
        #0000 20px\r
      );\r
  }\r
  .map2 {\r
    top: calc(50% + 50px);\r
    left: 30px;\r
    right: 30px;\r
    bottom: 30px;\r
    font-size: 12px;\r
  }\r
  .pop {\r
    position: absolute;\r
    top: calc(50% + 50px);\r
    left: calc(50% - 40px);\r
    width: 200px;\r
    bottom: 50px;\r
    font-size: 12px;\r
    transition: center;\r
    border: 2px solid;\r
 \r
    &::before {\r
      position: absolute;\r
      left: -2px;\r
      top: -25px;\r
      height: 25px;\r
      width: 0;\r
      border-left: 2px dashed currentColor;\r
      opacity: 0.5;\r
      content: '';\r
    }\r
  }\r
}\r
</style>\r
`;export{r as default};
