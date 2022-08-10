import{r,a as t,F as s,j as i,n,B as o}from"./index.085f51cf.js";import{P as l}from"./PageWalker.10e4a88d.js";const m=()=>{const[e,a]=r.exports.useState(!1);return t(s,{children:[t("span",{style:{color:"navy"},children:[i(n,{weight:1}),i(n,{}),i(n,{weight:3})]}),t("span",{children:[i(n,{loading:e,weight:1,lazy:2e3}),i(n,{loading:e,lazy:3e3})]}),t("div",{style:{maxWidth:300},children:[i(n.Container,{loading:e,children:i("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit amet ipsa numquam omnis molestias dolore enim officia sed quibusdam vitae itaque magni vel alias eos unde eveniet, distinctio explicabo dignissimos!"})}),i(n.Container,{loading:e,lazy:1e3,children:i("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit amet ipsa numquam omnis molestias dolore enim officia sed quibusdam vitae itaque magni vel alias eos unde eveniet, distinctio explicabo dignissimos!"})})]}),i(o,{loading:e,onClick:()=>{a(!0),setTimeout(()=>a(!1),1e3),setTimeout(()=>a(!0),1e3),setTimeout(()=>a(!1),4e3)},children:"Loading"})]})};var d=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),u=`import React, { useState } from 'react';\r
import { Button, Spin } from '\u{1F984}';\r
\r
const BasicUsage: React.FC = () => {\r
  const [l, setL] = useState(false);\r
\r
  return (\r
    <>\r
      <span style={{ color: 'navy' }}>\r
        <Spin weight={1} />\r
        <Spin />\r
        <Spin weight={3} />\r
      </span>\r
      <span>\r
        <Spin loading={l} weight={1} lazy={2000} />\r
        {/* 4000 will not appear \u{1F447} */}\r
        <Spin loading={l} lazy={3000} />\r
      </span>\r
      <div style={{ maxWidth: 300 }}>\r
        <Spin.Container loading={l}>\r
          <p>\r
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit amet ipsa numquam omnis\r
            molestias dolore enim officia sed quibusdam vitae itaque magni vel alias eos unde\r
            eveniet, distinctio explicabo dignissimos!\r
          </p>\r
        </Spin.Container>\r
        <Spin.Container loading={l} lazy={1000}>\r
          <p>\r
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit amet ipsa numquam omnis\r
            molestias dolore enim officia sed quibusdam vitae itaque magni vel alias eos unde\r
            eveniet, distinctio explicabo dignissimos!\r
          </p>\r
        </Spin.Container>\r
      </div>\r
      <Button\r
        loading={l}\r
        onClick={() => {\r
          setL(true);\r
          setTimeout(() => setL(false), 1000);\r
          setTimeout(() => setL(true), 1000);\r
          setTimeout(() => setL(false), 4000);\r
        }}\r
      >\r
        Loading\r
      </Button>\r
    </>\r
  );\r
};\r
export default BasicUsage;\r
`,p=`## Spin \u52A0\u8F7D\u7B26\r
\r
\`Spin\` \u7528\u4E8E\u663E\u793A\u52A0\u8F7D\u7B26\u3002\`Spin.Container\` \u7528\u4E8E\u9501\u5B9A\u4E00\u5757\u52A0\u8F7D\u533A\u57DF\u3002\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
::demo{basic}\r
\r
`,c=`## Spin \r
\r
Display a \`Spin\`, and \`Spin.Container\` is used to lock an area.\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
::demo{basic}\r
`;const g={"./basic.tsx":d},f={basic:u},v={zh:p,en:c},b=()=>i(l,{requireDemo:g,requireRaw:f,requireMd:v});export{b as default};
