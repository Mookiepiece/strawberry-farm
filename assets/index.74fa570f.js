import{r,a as o,F as v,j as e,q as n}from"./index.e42e054f.js";import{P as i}from"./PageWalker.8f5b2b25.js";const a=[{value:1},{value:12},{value:31},{value:311},{value:231},{value:321},{value:3331},{value:3431},{value:3117},{value:3231}],c=()=>{const[t,l]=r.exports.useState(null),[u,s]=r.exports.useState(null);return o(v,{children:[e("div",{style:{maxWidth:240},children:e(n,{filterable:!0,value:t,onChange:l,options:a})}),e("div",{style:{maxWidth:240},children:e(n,{value:u,onChange:s,options:a})})]})};var d=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"})),m=`import React, { useState } from 'react';\r
import { Select } from '\u{1F984}';\r
\r
const options = [\r
  {\r
    value: 1,\r
  },\r
  {\r
    value: 12,\r
  },\r
  {\r
    value: 31,\r
  },\r
  {\r
    value: 311,\r
  },\r
  {\r
    value: 231,\r
  },\r
  {\r
    value: 321,\r
  },\r
  {\r
    value: 3331,\r
  },\r
  {\r
    value: 3431,\r
  },\r
  {\r
    value: 3117,\r
  },\r
  {\r
    value: 3231,\r
  },\r
];\r
\r
const BasicUsage: React.FC = () => {\r
  const [value, setValue] = useState<any>(null);\r
  const [value2, setValue2] = useState<any>(null);\r
  return (\r
    <>\r
      <div style={{ maxWidth: 240 }}>\r
        <Select<number> filterable value={value} onChange={setValue} options={options} />\r
      </div>\r
      <div style={{ maxWidth: 240 }}>\r
        <Select<number> value={value2} onChange={setValue2} options={options} />\r
      </div>\r
    </>\r
  );\r
};\r
export default BasicUsage;\r
`,p=`## Select \u9009\u62E9\u5668\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
::demo{basic}\r
`,g=`## Select \u9009\u62E9\u5668\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
::demo{basic}\r
`;const S={"./basic.tsx":d},b={basic:m},h={zh:p,en:g},y=()=>e(i,{requireDemo:S,requireRaw:b,requireMd:h});export{y as default};
