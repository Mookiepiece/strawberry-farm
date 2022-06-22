import{r as o,a as r,F as s,j as e,B as i,C as l}from"./index.3f4b3495.js";import{B as u}from"./Box.2e8a9cb0.js";import{P as p}from"./PageWalker.5ae00577.js";const d=()=>{const[t,n]=o.exports.useState(!1),[a,c]=o.exports.useState(!1);return r(s,{children:[e(i,{onClick:()=>n(!t),children:t?"\u{1F474}":"\u{1F385}"}),r(l,{active:t,children:[e("p",{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis unde nesciunt laudantium quidem sint, suscipit sit facere quos dolor. Iure omnis aspernatur magni laudantium rerum enim quam placeat libero voluptate."}),r(u,{className:"my-10",gap:10,children:[e(i,{onClick:()=>n(!t),children:"toggle"}),e(i,{onClick:()=>c(!a),children:"inner toggle2"})]}),e(l,{children:a?r(s,{children:[e("p",{children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis culpa beatae! Veritatis odio consequuntur iure magnam esse!"}),e("div",{style:{height:20,marginBottom:100,background:"aliceblue"},children:e("div",{style:{height:10,marginBottom:-90,background:"pink"}})})]}):null}),e("p",{children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis culpa beatae! Veritatis odio consequuntur iure magnam esse!"})]})]})};var m=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"})),h=`import React, { useState } from 'react';\r
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
              <p>\r
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis\r
                architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis\r
                culpa beatae! Veritatis odio consequuntur iure magnam esse!\r
              </p>\r
              <div style={{ height: 20, marginBottom: 100, background: 'aliceblue' }}>\r
                <div style={{ height: 10, marginBottom: -90, background: 'pink' }}></div>\r
              </div>\r
            </>\r
          ) : null}\r
        </Collapse>\r
        <p>\r
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
`,g="## Collapse \u6298\u53E0\u9762\u677F\r\n\r\n:::demo{individual}\r\n\r\n### \u72EC\u7ACB\u9762\u677F\r\n\r\n\u80FD\u591F\u7F13\u5B58 `children` \u8282\u70B9 `0.3s`\uFF0C \u4E00\u4E2A\u53EF\u9009\u7684\u89E6\u53D1\u65B9\u5F0F\u662F\u5C06 `children` \u53D8\u4E3A `falsy`\u3002\r\n\r\n:::\r\n\r\n### \u63A5\u53E3\u7D22\u5F15\r\n\r\n| Collapse.Panel Property | Description        | Type      |\r\n| ----------------------- | ------------------ | --------- |\r\n| active:required         | visibility control | `boolean` |\r\n\r\n### DOM\r\n\r\n`div`\r\n\r\n### \u539F\u7406\r\n\r\n\u82E5\u9762\u677F\u5B9A\u9AD8\uFF0C`css transition`\u5C31\u53EF\u4EE5\u4E86\uFF0C\u5426\u5219\u8981\u50CF\u8FD9\u6837\u5229\u7528`js`\u63D0\u524D\u4E00\u5E27\u8BBE\u7F6E\u9AD8\u5EA6\u3002\r\n\r\nBootstrap \u548C W3Schools \u4F7F\u7528\u4E86 `scrollHeight` \uFF0C\u5B83\u7684\u503C\u53EA\u548C\u5185\u90E8\u5185\u5BB9\u6709\u5173\uFF0C\u54EA\u6015\u6298\u53E0\u5230\u4E00\u534A\u7A81\u7136\u6298\u53CD\uFF0C`scrollHeight` \u80FD\u591F\u6B63\u786E\u77E5\u9053\u52A8\u753B\u8FD4\u6298\u7684\u76EE\u6807\u9AD8\u5EA6\u3002\r\n\r\n- [Bootstrap: collapse.js](https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js#L202)\r\n- [W3schools: Collapse ](https://www.w3schools.com/howto/howto_js_collapsible.asp)\r\n\r\n\u54EA\u6015\u5B50\u5143\u7D20\u8BBE\u7F6E\u4E86`height:0`\uFF0C`scrollHeight` \u4F9D\u65E7\u4F1A\u5C06\u5B9E\u9645\u9AD8\u5EA6\u7EB3\u5165\u8BA1\u7B97\uFF0C\r\n\u4EE5\u53CA\u53EF\u80FD\u4F1A\u628A\u5B50\u5143\u7D20\u7684\u4E0B`margin`\u7EB3\u5165\u8BA1\u7B97\u5BFC\u81F4\u51FA\u73B0\u52A8\u753B\u65AD\u5C42\uFF0C\r\n\u89E3\u51B3\u65B9\u6CD5\u662F\u65B0\u5EFA[\u5757\u683C\u5F0F\u5316\u4E0A\u4E0B\u6587 ](https://zhuanlan.zhihu.com/p/131402341)\uFF0C\u7ED9 panel \u8BBE\u7F6E `overflow:hidden` \u5C31\u53EF\u4EE5\u4E86\r\n\r\n\u6CE8\u610F\uFF1A\u5B50\u5143\u7D20\u5B58\u5728\u8D1F\u503C\u7684`margin`&`padding`\u4F1A\u5BFC\u81F4 `scrollHeight` \u8BA1\u7B97\u51FA\u9519\r\n\r\n\u989D\u5916\u7684\uFF1A\u53E6\u4E00\u4E2A\u6295\u673A\u53D6\u5DE7\u7684\u65B9\u6CD5\u662F\u8BBE\u7F6E `max-height` \u4EE3\u66FF `height`, \u4F46\u662F\u53EF\u4EE5\u770B\u5230\u660E\u663E\u7684\u5EF6\u8FDF\uFF0C\u56E0\u4E3A max-height \u603B\u662F\u4E00\u4E2A\u6EA2\u51FA\u7684\u5F88\u9AD8\u7684\u503C\uFF0C\u964D\u4F4E\u5230\u672C\u4F53\u7684\u9AD8\u5EA6\u8FD8\u662F\u9700\u8981\u65F6\u95F4\u7684\r\n\r\n- [Toggle Collapse - Animate Height (pure JS) ](https://codepen.io/davidcochran/pen/RNOOEO)\r\n",v="## Collapse\r\n\r\n:::demo{individual}\r\n\r\n### Individual Panel\r\n\r\nCache `children` nodes for `0.3s`, an alternative way to trigger animation is set `children` to `null`.\r\n\r\n:::\r\n\r\n### API Reference\r\n\r\n| Collapse.Panel Property | Description        | Type      |\r\n| ----------------------- | ------------------ | --------- |\r\n| active:required         | visibility control | `boolean` |\r\n\r\n### DOM\r\n\r\n`div`\r\n\r\n### Note\r\n\r\nIf your panel has fixed height, then `css transition` is better, otherwise you need `js` -> this component.\r\n\r\nBootstrap \u548C W3Schools uses `scrollHeight` , It's value is only related to what content it contains.\r\n\r\n- [Bootstrap: collapse.js](https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js#L202)\r\n- [W3schools: Collapse ](https://www.w3schools.com/howto/howto_js_collapsible.asp)\r\n\r\nif children it set to `height: 0`, we will got wrong `scrollHeight`, the last children's bottom `margin` will also causes a glitch.\r\nYou should establish a new `BFC` for the collapse panel, TL;DR `overflow:hidden`.\r\n\r\nNote\uFF1Anegative `margin`&`padding` will lead to wrong `scrollHeight`.\r\n\r\nA tricky alternative way is use `max-height` instead of `height`\r\n\r\n- [Toggle Collapse - Animate Height (pure JS) ](https://codepen.io/davidcochran/pen/RNOOEO)\r\n";const b={"./individual.tsx":m},f={individual:h},w={zh:g,en:v},y=()=>e(p,{requireDemo:b,requireRaw:f,requireMd:w});export{y as default};
