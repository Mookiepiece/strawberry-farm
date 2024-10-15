const n=`<!-- \r
Inspired By:\r
\r
Plants VS Zombies\r
\r
-->\r
\r
<template>\r
  <div class="ZenGarden">\r
    <div class="bin">\r
      <span class="plant">🌻</span>\r
      <span class="quote">💧</span>\r
    </div>\r
    <div class="bin">\r
      <span class="plant">🌻</span>\r
    </div>\r
    <div class="bin">\r
      <span class="plant">🌼</span>\r
    </div>\r
    <div class="bull">🐌</div>\r
\r
    <iframe\r
      frameborder="no"\r
      border="0"\r
      marginwidth="0"\r
      marginheight="0"\r
      width="320"\r
      height="86"\r
      src="//music.163.com/outchain/player?type=2&id=3019806&auto=0&height=66"\r
    ></iframe>\r
  </div>\r
</template>\r
\r
<style>\r
.ZenGarden {\r
  position: relative;\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));\r
  grid-gap: 10px;\r
\r
  padding: 50px 10px 150px;\r
  font-size: 35px;\r
  line-height: 1.1;\r
\r
  .bin {\r
    width: max-content;\r
\r
    position: relative;\r
\r
    .plant {\r
      display: block;\r
      animation: ZenGardenPlant 1s linear alternate-reverse infinite;\r
      transform-origin: bottom center;\r
    }\r
\r
    .plant::before {\r
      position: absolute;\r
      top: 5px;\r
      left: 50%;\r
      font-size: 55%;\r
      content: '🙂';\r
      transform: translateX(-50%);\r
    }\r
\r
    .quote {\r
      position: absolute;\r
      top: -30px;\r
      right: -40px;\r
      width: 50px;\r
      display: block;\r
\r
      padding: 10px;\r
      font-size: 15px;\r
      line-height: 1;\r
      text-align: center;\r
      border: 1px solid #9996;\r
      box-shadow: 0 1px 2px 0 #9994;\r
      border-radius: 10px;\r
      border-bottom-left-radius: 0;\r
    }\r
\r
    &::after {\r
      position: absolute;\r
      left: 10px;\r
      right: 10px;\r
      bottom: -10px;\r
      height: 12px;\r
      background: #942;\r
      content: '';\r
      clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);\r
    }\r
  }\r
\r
  .bull {\r
    position: absolute;\r
    bottom: 110px;\r
    font-size: 25px;\r
    left: 0;\r
    animation: ZenGardenDrive 5s infinite linear;\r
  }\r
\r
  iframe {\r
    position: absolute;\r
    left: 50%;\r
    bottom: 0;\r
    transform: translateX(-50%);\r
  }\r
}\r
\r
@keyframes ZenGardenPlant {\r
  from {\r
    transform: skewX(10deg);\r
  }\r
  50% {\r
    transform: scaleY(0.8);\r
  }\r
  to {\r
    transform: skewX(-10deg);\r
  }\r
}\r
@keyframes ZenGardenDrive {\r
  0% {\r
    transform: scaleX(-1);\r
  }\r
  45% {\r
    transform: translateX(calc(300px - 1em)) scaleX(-1);\r
  }\r
  50% {\r
    transform: translateX(calc(300px - 1em)) scaleX(1);\r
  }\r
  95% {\r
    transform: scaleX(1);\r
  }\r
  100% {\r
    transform: scaleX(-1);\r
  }\r
}\r
</style>\r
`;export{n as default};
