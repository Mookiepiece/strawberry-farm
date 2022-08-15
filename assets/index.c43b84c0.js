import{r as n,a as r,F as o,j as e,B as i,C as l,b as u}from"./index.e42e054f.js";import{P as p}from"./PageWalker.8f5b2b25.js";const m=()=>{const[t,a]=n.exports.useState(!1),[s,c]=n.exports.useState(!1);return r(o,{children:[e(i,{onClick:()=>a(!t),children:t?"\u{1F474}":"\u{1F385}"}),r(l,{active:t,children:[e("p",{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis unde nesciunt laudantium quidem sint, suscipit sit facere quos dolor. Iure omnis aspernatur magni laudantium rerum enim quam placeat libero voluptate."}),r(u,{className:"my-10",gap:10,children:[e(i,{onClick:()=>a(!t),children:"toggle"}),e(i,{onClick:()=>c(!s),children:"inner toggle2"})]}),e(l,{children:s?e(o,{children:e("p",{style:{height:100},children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis culpa beatae! Veritatis odio consequuntur iure magnam esse!"})}):null}),e("p",{style:{margin:0},children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis culpa beatae! Veritatis odio consequuntur iure magnam esse!"})]})]})};var d=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),h=`import React, { useState } from 'react';\r
import { Box, Button, Collapse } from '\u{1F984}';\r
\r
const Individual: React.FC = () => {\r
  const [active, setActive] = useState(false);\r
  const [active2, setActive2] = useState(false);\r
  return (\r
    <>\r
      <Button onClick={() => setActive(!active)}>{active ? '\u{1F474}' : '\u{1F385}'}</Button>\r
      <Collapse active={active}>\r
        <p>\r
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis unde nesciunt\r
          laudantium quidem sint, suscipit sit facere quos dolor. Iure omnis aspernatur magni\r
          laudantium rerum enim quam placeat libero voluptate.\r
        </p>\r
        <Box className="my-10" gap={10}>\r
          <Button onClick={() => setActive(!active)}>toggle</Button>\r
          <Button onClick={() => setActive2(!active2)}>inner toggle2</Button>\r
        </Box>\r
        <Collapse>\r
          {active2 ? (\r
            <>\r
              <p style={{ height: 100 }}>\r
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis\r
                architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis\r
                culpa beatae! Veritatis odio consequuntur iure magnam esse!\r
              </p>\r
            </>\r
          ) : null}\r
        </Collapse>\r
        <p style={{ margin: 0 }}>\r
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis\r
          architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis culpa\r
          beatae! Veritatis odio consequuntur iure magnam esse!\r
        </p>\r
      </Collapse>\r
    </>\r
  );\r
};\r
\r
export default Individual;\r
`,g=`## Collapse \u6298\u53E0\u9762\u677F\r
\r
Animation Component\r
\r
:::demo{basic}\r
\r
### \u72EC\u7ACB\u9762\u677F\r
\r
\u80FD\u591F\u7F13\u5B58 \`children\` \u8282\u70B9 \`0.3s\`\uFF0C \u4E00\u4E2A\u53EF\u9009\u7684\u89E6\u53D1\u65B9\u5F0F\u662F\u5C06 \`children\` \u53D8\u4E3A \`falsy\`\u3002\r
\r
:::\r
\r
### DOM\r
\r
\`div\`\r
\r
### \u539F\u7406\r
\r
\u82E5\u9762\u677F\u5B9A\u9AD8\uFF0C\`css transition\`\u5C31\u53EF\u4EE5\u4E86\uFF0C\u9762\u677F\u4E0D\u5B9A\u9AD8\u8981\u50CF\u8FD9\u6837\u5229\u7528\`js\`\u63D0\u524D\u4E00\u5E27\u8BBE\u7F6E\u9AD8\u5EA6\u3002\r
\r
Bootstrap \u548C W3Schools \u4F7F\u7528\u4E86 \`scrollHeight\` \u3002\r
\r
- [Bootstrap: collapse.js](https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js#L202)\r
- [W3schools: Collapse ](https://www.w3schools.com/howto/howto_js_collapsible.asp)\r
\r
\u5B50\u5143\u7D20\u8BBE\u7F6E\u4E86 \`height:0\`\uFF0C\`scrollHeight\` \u4F9D\u65E7\u4F1A\u5C06\u5B9E\u9645\u9AD8\u5EA6\u7EB3\u5165\u8BA1\u7B97\uFF0C\u4EE5\u53CA\u53EF\u80FD\u56E0\u4E3A \`margin collapsing\` \u73B0\u8C61\u5B50\u5143\u7D20\u8BBE\u7F6E\u4E86\`margin\`\u5BFC\u81F4\u52A8\u753B\u65AD\u5C42\u3002\r
\u65B0\u5EFA[\u5757\u683C\u5F0F\u5316\u4E0A\u4E0B\u6587](https://zhuanlan.zhihu.com/p/131402341)\u53EF\u4EE5\u89E3\u51B3\u90E8\u5206\u95EE\u9898\uFF0C\u7ED9 panel \u8BBE\u7F6E \`overflow:hidden\` \u5C31\u53EF\u4EE5\u4E86\r
\r
\u989D\u5916\u7684\uFF1A\u53E6\u4E00\u4E2A\u6295\u673A\u53D6\u5DE7\u7684\u65B9\u6CD5\u662F\u8BBE\u7F6E \`max-height\` \u4EE3\u66FF \`height\`, \u4F46\u662F\u53EF\u4EE5\u770B\u5230\u660E\u663E\u7684\u5EF6\u8FDF\uFF0C\u56E0\u4E3A max-height \u603B\u662F\u4E00\u4E2A\u6EA2\u51FA\u7684\u5F88\u9AD8\u7684\u503C\uFF0C\u964D\u4F4E\u5230\u672C\u4F53\u7684\u9AD8\u5EA6\u8FD8\u662F\u9700\u8981\u65F6\u95F4\u7684\r
\r
- [Toggle Collapse - Animate Height (pure JS) ](https://codepen.io/davidcochran/pen/RNOOEO)\r
`,b=`## Collapse\r
\r
Animation Component\r
\r
:::demo{basic}\r
\r
### Individual Panel\r
\r
Cache \`children\` nodes for \`0.3s\`, an alternative way to trigger animation is set \`children\` to \`null\`.\r
\r
:::\r
\r
### DOM\r
\r
\`div\`\r
\r
### Note\r
\r
If your panel has fixed height, then \`css transition\` is better, otherwise you need to write \`js\` like this component.\r
\r
Bootstrap \u548C W3Schools uses \`scrollHeight\`.\r
\r
- [Bootstrap: collapse.js](https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js#L202)\r
- [W3schools: Collapse ](https://www.w3schools.com/howto/howto_js_collapsible.asp)\r
\r
\`height: 0\` won't affect calculated \`scrollHeight\` and may cause glitches, same does \`margin collapsing\`.\r
\r
A tricky alternative way is use \`max-height\` instead of \`height\`\r
\r
- [Toggle Collapse - Animate Height (pure JS) ](https://codepen.io/davidcochran/pen/RNOOEO)\r
`;const v={"./basic.tsx":d},f={basic:h},C={zh:g,en:b},B=()=>e(p,{requireDemo:v,requireRaw:f,requireMd:C});export{B as default};
