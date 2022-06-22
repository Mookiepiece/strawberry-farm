import{j as r}from"./index.3f4b3495.js";import{P as i}from"./PageWalker.5ae00577.js";const e=({title:u,children:n,warning:t})=>r("div",{style:{whiteSpace:"pre"},children:[`
\uFF0F \uFFE3\uFFE3 \uFF3C\u3000
|\u3000\u30FC\u3000\u30FC \\\u3000 \uFF0F\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFF3C
|\u3000 \u25C9\u3000\u25C9 |   |\u3000   ${u}    \\
\\\u3000\u3000 \u25B1\u3000/ \u2220     ${n}   /
 \uFF3C\u3000\u3000 \u30A4\u3000 \\ ________________/
\uFF0F\u3000\u3000\u3000\\
/\u3000|\u3000\u3000\u3000 \\
|\u3000|\u3000\u3000\u3000 | |
`.trim(),`
\uFF0F \uFFE3\uFFE3 \uFF3C\u3000
|\u3000\u4E40\u3000\u221A   \\\u3000 \uFF0F\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFF3C
|\u3000 \u25C9\u3000\u25C9 |   |\u3000   ${u}    \\
\\\u3000  / \u76BF\\  / \u2220    ${n}  /
 \uFF3C\u3000\u3000 \u30A4\u3000 \\ ________________/
\uFF0F\u3000\u3000\u3000\\
/\u3000|\u3000\u3000\u3000 \\
|\u3000|\u3000\u3000\u3000 | |
`.trim()][t?1:0]}),F=()=>r(e,{title:"Hi Indian MI Fans",children:"Are U OK Are U OK"});var a=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));const o=()=>r("div",{children:r(e,{warning:!0,title:"\u6211\u5230\u6CB3\u5317\u7701\u6765",children:"\u5E72\u7092\u597D\u68D2\u597D\u68D2\u7684"})});var _=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"})),l=`import React from 'react';\r
import { Dialog } from '\u{1F984}';\r
\r
const Demo: React.FC = () => {\r
  return <Dialog title={'Hi Indian MI Fans'}>Are U OK Are U OK</Dialog>;\r
};\r
\r
export default Demo;\r
`,s=`import React from 'react';\r
import { Dialog } from '\u{1F984}';\r
\r
const Demo: React.FC = () => {\r
  return (\r
    <div>\r
      <Dialog warning title={'\u6211\u5230\u6CB3\u5317\u7701\u6765'}>\r
        \u5E72\u7092\u597D\u68D2\u597D\u68D2\u7684\r
      </Dialog>\r
    </div>\r
  );\r
};\r
\r
export default Demo;\r
`,g=`## Dialog \u5BF9\u8BDD\u6846\r
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
### \u63A5\u53E3\u7D22\u5F15\r
\r
| Property        | Description   | Type      |\r
| --------------- | ------------- | --------- |\r
| title :required | title         | \`string\`  |\r
| warning         | warning state | \`boolean\` |\r
`,c=`## Dialog\r
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
render a more eye-catching, inspiring and passionate dialog.\r
\r
:::\r
\r
### API\r
\r
| Property        | Description   | Type      |\r
| --------------- | ------------- | --------- |\r
| title :required | title         | \`string\`  |\r
| warning         | warning state | \`boolean\` |\r
`;const d={"./basic.tsx":a,"./warning.tsx":_},m={basic:l,warning:s},D={zh:g,en:c},C=()=>r(i,{requireDemo:d,requireRaw:m,requireMd:D});export{C as default};
