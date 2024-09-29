const r=`<template>\r
  <div class="Chiikawa" title="https://x.com/ngnchiikawa"></div>\r
</template>\r
\r
<style>\r
.Chiikawa {\r
  position: relative;\r
  width: 100px;\r
  height: 100px;\r
  --blue: rgb(94, 154, 189);\r
  background:\r
    no-repeat calc(50% + 23px) calc(50% + 6px) / 2px 7px\r
      radial-gradient(ellipse, black 0px, transparent 1px),\r
    no-repeat calc(50% + 26px) calc(50% + 6px) / 2px 7px\r
      radial-gradient(ellipse, black 0px, transparent 1px),\r
    no-repeat calc(50% - 23px) calc(50% + 6px) / 2px 7px\r
      radial-gradient(ellipse, black 0px, transparent 1px),\r
    no-repeat calc(50% - 26px) calc(50% + 6px) / 2px 7px\r
      radial-gradient(ellipse, black 0px, transparent 1px),\r
    no-repeat calc(50% - 24px) calc(50% + 6px) / 13px 7px\r
      radial-gradient(ellipse, pink 4px, transparent 6px),\r
    no-repeat calc(50% + 24px) calc(50% + 6px) / 13px 7px\r
      radial-gradient(ellipse, pink 4px, transparent 6px),\r
    linear-gradient(\r
      white 0px,\r
      white 12px,\r
      transparent 12px,\r
      transparent 70px,\r
      white 71px\r
    ),\r
    no-repeat center / 100px 80px\r
      radial-gradient(transparent 45px, black 46px, black 47px, white 48px),\r
    no-repeat calc(50%) calc(50% - 32px) / 50px 22px\r
      radial-gradient(ellipse, var(--blue) 15px, transparent 16px),\r
    no-repeat calc(50% + 20px) calc(50% - 30px) / 50px 22px\r
      radial-gradient(\r
        ellipse,\r
        var(--blue) 20px,\r
        black 21px,\r
        black 22px,\r
        transparent 23px\r
      ),\r
    no-repeat calc(50% - 20px) calc(50% - 30px) / 50px 22px\r
      radial-gradient(\r
        ellipse,\r
        var(--blue) 20px,\r
        black 21px,\r
        black 22px,\r
        transparent 23px\r
      ),\r
    no-repeat center / 100px 78px\r
      radial-gradient(\r
        transparent 45px,\r
        black 46px,\r
        black 47px,\r
        transparent 48px\r
      ),\r
    no-repeat calc(50% - 11px) calc(50% - 15px) / 7px 3px\r
      radial-gradient(ellipse, black 2px, transparent 3px),\r
    no-repeat calc(50% + 11px) calc(50% - 15px) / 7px 3px\r
      radial-gradient(ellipse, black 2px, transparent 3px),\r
    no-repeat calc(50%) calc(50% + 13px) / 5px 2px\r
      radial-gradient(ellipse at top, black 1px, transparent 2px),\r
    no-repeat calc(50% + 4px) calc(50% + 7px) / 9px 7px\r
      radial-gradient(\r
        ellipse at 6px 1px,\r
        transparent 3px,\r
        black 4px,\r
        black 4px,\r
        transparent 6px\r
      ),\r
    no-repeat calc(50% - 3px) calc(50% + 7px) / 9px 7px\r
      radial-gradient(\r
        ellipse at 3px 1px,\r
        transparent 3px,\r
        black 4px,\r
        black 4px,\r
        transparent 6px\r
      ),\r
    no-repeat calc(50% - 14px) calc(50% - 7px) / 15px 9px\r
      radial-gradient(white 3px, transparent 4px),\r
    no-repeat calc(50% + 13px) calc(50% - 7px) / 15px 9px\r
      radial-gradient(white 3px, transparent 4px),\r
    no-repeat calc(50% - 12px) calc(50% - 2px) / 5px 2px\r
      radial-gradient(ellipse at 40% 40%, white 2px, transparent 3px),\r
    no-repeat calc(50% + 15px) calc(50% - 2px) / 5px 2px\r
      radial-gradient(ellipse at 40% 40%, white 2px, transparent 3px),\r
    no-repeat -14px -5px radial-gradient(black 5px, transparent 6px),\r
    no-repeat 14px -5px radial-gradient(black 5px, transparent 6px),\r
    white;\r
\r
  &::before,\r
  &::after {\r
    display: block;\r
    position: absolute;\r
    top: 7px;\r
    left: 19px;\r
    width: 25px;\r
    height: 25px;\r
    border-radius: 6px;\r
    transform: scaleX(0.9) rotate(28deg);\r
    border: 2px solid black;\r
    background: var(--blue);\r
    content: '';\r
    clip-path: circle(85% at 0 0);\r
  }\r
\r
  &::after {\r
    left: unset;\r
    top: 7px;\r
    right: 19px;\r
    transform: scaleX(0.9) rotate(62deg);\r
  }\r
}\r
</style>\r
`;export{r as default};
