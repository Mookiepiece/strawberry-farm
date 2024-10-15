const r=`<!-- \r
Inspired By:\r
\r
【再嘬一口入肺里，是我今生唯一的夙愿...《死一样的抽过》】 https://www.bilibili.com/video/BV1tJ4m1T7QL\r
【《明日方舟》EP - Missy】 https://www.bilibili.com/video/BV1ch4y1w7xM\r
\r
-->\r
\r
<template>\r
  <div\r
    style="\r
      max-width: 300px;\r
      padding: 5px;\r
      padding-top: 70px;\r
\r
      --rad: radial-gradient(blue 3px, white 4px, white 5px, transparent 5px);\r
      background:\r
        no-repeat 5px 55px / 10px 10px var(--rad),\r
        no-repeat 16px 55px / 10px 10px var(--rad),\r
        no-repeat 27px 55px / 10px 10px var(--rad),\r
        #aaaa;\r
      font-size: 17px;\r
    "\r
  >\r
    <article\r
      style="\r
        color: blue;\r
        filter: drop-shadow(-1px 0 var(--s)) drop-shadow(1px 0 var(--s))\r
          drop-shadow(0px -1px var(--s)) drop-shadow(0px 1px var(--s));\r
        --s: #fff;\r
      "\r
    >\r
      我正在往理塘去了，\r
    </article>\r
    <article\r
      style="\r
        text-align: end;\r
        color: white;\r
        filter: drop-shadow(-1px 0 var(--s)) drop-shadow(1px 0 var(--s))\r
          drop-shadow(0px -1px var(--s)) drop-shadow(0px 1px var(--s));\r
        --s: #444;\r
      "\r
    >\r
      请你等一等我。\r
    </article>\r
  </div>\r
</template>\r
`;export{r as default};
