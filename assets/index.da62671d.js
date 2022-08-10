import{j as r,D as e,a as n,b as a,r as u,F as i,B as s}from"./index.085f51cf.js";import{P as l}from"./PageWalker.10e4a88d.js";const c=()=>r(e.Body,{children:n(a,{className:"p-20",children:[r("span",{children:"Hi Indian MI Fans"}),r("span",{children:"Are U OK Are U OK"})]})});var d=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));const p=()=>{const[t,o]=u.exports.useState(!1);return n(i,{children:[r(s,{primary:!0,onClick:()=>o(!0),children:"Open Dialog"}),r(e,{visible:t,onClose:()=>o(!1),children:r(e.Body,{children:r(a,{className:"p-20",children:" \u201C\u53EF\u6211\u9664\u4E86\u7092\u9E21\u86CB\uFF0C\u4EC0\u4E48\u90FD\u4E0D\u4F1A\u3002\u201D "})})})]})};var g=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));const m=()=>r(e.Body,{warning:!0,children:n(a,{className:"p-20",children:[r("span",{children:"\u6211\u5230\u6CB3\u5317\u7701\u6765"}),r("span",{children:"\u5E72\u7092\u597D\u68D2\u597D\u68D2\u7684"})]})});var D=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),B=`import React from 'react';\r
import { Box, Dialog } from '\u{1F984}';\r
\r
const Demo: React.FC = () => {\r
  return (\r
    <Dialog.Body>\r
      <Box className="p-20">\r
        <span>Hi Indian MI Fans</span>\r
        <span>Are U OK Are U OK</span>\r
      </Box>\r
    </Dialog.Body>\r
  );\r
};\r
\r
export default Demo;\r
`,b=`import React from 'react';\r
import { Box, Dialog } from '\u{1F984}';\r
\r
const Demo: React.FC = () => {\r
  return (\r
    <Dialog.Body warning>\r
      <Box className="p-20">\r
        <span>\u6211\u5230\u6CB3\u5317\u7701\u6765</span>\r
        <span>\u5E72\u7092\u597D\u68D2\u597D\u68D2\u7684</span>\r
      </Box>\r
    </Dialog.Body>\r
  );\r
};\r
\r
export default Demo;\r
`,f=`import React, { useState } from 'react';\r
import { Box, Button, Dialog } from '\u{1F984}';\r
\r
const BasicUsage: React.FC = () => {\r
  const [visible, setVisible] = useState(false);\r
  return (\r
    <>\r
      <Button primary onClick={() => setVisible(true)}>\r
        Open Dialog\r
      </Button>\r
      <Dialog visible={visible} onClose={() => setVisible(false)}>\r
        <Dialog.Body>\r
          <Box className="p-20"> \u201C\u53EF\u6211\u9664\u4E86\u7092\u9E21\u86CB\uFF0C\u4EC0\u4E48\u90FD\u4E0D\u4F1A\u3002\u201D </Box>\r
        </Dialog.Body>\r
      </Dialog>\r
    </>\r
  );\r
};\r
export default BasicUsage;\r
`,_=`## Dialog \u5BF9\u8BDD\u6846\r
\r
:::demo{basic}\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
\u6E32\u67D3\u4E00\u4E2A\u57FA\u672C\u7684\u5BF9\u8BDD\u6846\r
\r
:::\r
\r
:::demo{warning}\r
\r
### \u8B66\u544A\u72B6\u6001\r
\r
\u8FD9\u4E2A\u5BF9\u8BDD\u6846\u4F1A\u770B\u8D77\u6765\u66F4\u4E25\u5CFB\r
\r
:::\r
\r
:::demo{portal}\r
\r
### \u6253\u5F00\r
\r
:::\r
`,x=`## Dialog\r
\r
:::demo{basic}\r
\r
### Basic Usage\r
\r
This is a basic dialog\r
\r
:::\r
\r
:::demo{warning}\r
\r
### Warning State\r
\r
render a eye-catching dialog.\r
\r
:::\r
\r
:::demo{portal}\r
\r
### Openable\r
\r
:::\r
`;const F={"./basic.tsx":d,"./portal.tsx":g,"./warning.tsx":D},y={basic:B,warning:b,portal:f},C={zh:_,en:x},E=()=>r(l,{requireDemo:F,requireRaw:y,requireMd:C});export{E as default};
