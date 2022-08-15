import{j as r,F as n,B as t,N as e}from"./index.e42e054f.js";import{P as a}from"./PageWalker.8f5b2b25.js";const o=()=>r(n,{children:r(t,{primary:!0,onClick:()=>e.push(r("h1",{style:{fontSize:void 0},children:"abcdefg"})),children:"\u6253\u5F00\u5BF9\u8BDD\u6846"})});var i=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"})),c=`import React, { useState } from 'react';\r
import { Button, Notification } from '\u{1F984}';\r
\r
const BasicUsage: React.FC = () => {\r
  return (\r
    <>\r
      <Button primary onClick={() => Notification.push(<h1 style={{fontSize:undefined}}>abcdefg</h1>)}>\r
        \u6253\u5F00\u5BF9\u8BDD\u6846\r
      </Button>\r
    </>\r
  );\r
};\r
export default BasicUsage;\r
`,s=`## Notification \u901A\u77E5\u63D0\u793A\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
\u6253\u5F00\u4E00\u4E2A\u901A\u77E5\u6846\uFF0C\u91CC\u9762\u80FD\u591F\u5D4C\u5165\u4EFB\u610F\`React\`\u8282\u70B9\r
\r
::demo{basic}\r
\r
`,u=`## Notification \r
\r
### Basic\r
\r
Open a toastr with provided react nodes.\r
\r
::demo{basic}\r
`;const d={"./basic.tsx":i},f={basic:c},l={zh:s,en:u},B=()=>r(a,{requireDemo:d,requireRaw:f,requireMd:l});export{B as default};
