import{r as o,j as n,F as a,a as d,B as t}from"./index.3f4b3495.js";import{B as l}from"./Box.2e8a9cb0.js";import{P as c}from"./PageWalker.5ae00577.js";function s(){var u=o.exports.useRef(!1),r=o.exports.useCallback(function(){return u.current},[]);return o.exports.useEffect(function(){return u.current=!0,function(){u.current=!1}},[]),r}const g=()=>{const u=s(),[r,i]=o.exports.useState(!1),e=()=>{i(!0),setTimeout(()=>{u()&&i(!1)},2e3)};return n(a,{children:d(l,{gap:10,children:[n("div",{children:n(t,{primary:!0,solid:!0,onClick:e,loading:r,children:"\u4E3B\u8981\u5B9E\u5FC3\u6309\u94AE"})}),n("div",{children:n(t,{primary:!0,onClick:e,loading:r,children:"\u4E3B\u8981\u6309\u94AE"})}),n("div",{children:n(t,{onClick:e,loading:r,children:"\u6B21\u7EA7\u6309\u94AE"})}),n("div",{children:n(t,{textual:!0,onClick:e,loading:r,children:"\u6587\u5B57\u6309\u94AE"})}),n("div",{children:n(t,{primary:!0,solid:!0,block:!0,onClick:e,loading:r,children:"\u5757\u72B6\u6309\u94AE"})}),n("div",{children:n(t,{primary:!0,block:!0,onClick:e,loading:r,children:"\u5757\u72B6\u6309\u94AE"})}),n("div",{children:n(t,{block:!0,onClick:e,loading:r,children:"\u5757\u72B6\u6309\u94AE"})}),n("div",{children:n(t,{textual:!0,block:!0,onClick:e,loading:r,children:"\u5757\u72B6\u6309\u94AE"})})]})})};var B=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));const h=()=>n(t,{haircut:!0,width:60,height:35,children:"\u30FB_\u30FB"});var m=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"})),p=`import React, { useState } from 'react';\r
import { useMountedState } from 'react-use';\r
import { Box, Button } from '\u{1F984}';\r
\r
const Demo: React.FC = () => {\r
  const isMounted = useMountedState();\r
  const [loading, setLoading] = useState(false);\r
\r
  const handleLoading = () => {\r
    setLoading(true);\r
\r
    setTimeout(() => {\r
      isMounted() && setLoading(false);\r
    }, 2000);\r
  };\r
\r
  return (\r
    <>\r
      <Box gap={10}>\r
        <div>\r
          <Button primary solid onClick={handleLoading} loading={loading}>\r
            \u4E3B\u8981\u5B9E\u5FC3\u6309\u94AE\r
          </Button>\r
        </div>\r
        <div>\r
          <Button primary onClick={handleLoading} loading={loading}>\r
            \u4E3B\u8981\u6309\u94AE\r
          </Button>\r
        </div>\r
        <div>\r
          <Button onClick={handleLoading} loading={loading}>\r
            \u6B21\u7EA7\u6309\u94AE\r
          </Button>\r
        </div>\r
        <div>\r
          <Button textual onClick={handleLoading} loading={loading}>\r
            \u6587\u5B57\u6309\u94AE\r
          </Button>\r
        </div>\r
        <div>\r
          <Button primary solid block onClick={handleLoading} loading={loading}>\r
            \u5757\u72B6\u6309\u94AE\r
          </Button>\r
        </div>\r
        <div>\r
          <Button primary block onClick={handleLoading} loading={loading}>\r
            \u5757\u72B6\u6309\u94AE\r
          </Button>\r
        </div>\r
        <div>\r
          <Button block onClick={handleLoading} loading={loading}>\r
            \u5757\u72B6\u6309\u94AE\r
          </Button>\r
        </div>\r
        <div>\r
          <Button textual block onClick={handleLoading} loading={loading}>\r
            \u5757\u72B6\u6309\u94AE\r
          </Button>\r
        </div>\r
      </Box>\r
    </>\r
  );\r
};\r
export default Demo;\r
`,v=`import React from 'react';\r
import { Button } from '\u{1F984}';\r
\r
const Haircut: React.FC = () => {\r
  return (\r
    <Button haircut width={60} height={35}>\r
      \u30FB_\u30FB\r
    </Button>\r
  );\r
};\r
\r
export default Haircut;\r
`,f=`## Button \u6309\u94AE\r
\r
:::demo{basic}\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
:::\r
\r
\r
:::demo{haircut}\r
\r
### \u53D1\u578B\r
\r
\u4E00\u4E2A\u597D\u7684\u53D1\u578B\u53EF\u4EE5\u8BA9\u4F60\u7684\u6309\u94AE\u770B\u4E0A\u53BB\u66F4\u61C2\u3002\r
\r
:::\r
\r
### \u63A5\u53E3\u7D22\u5F15\r
\r
| Property | Description | Type                |\r
| -------- | ----------- | ------------------- |\r
| haircut  |             | \`boolean\`           |`,b=`## Button\r
\r
:::demo{basic}\r
\r
### Basic Usage\r
\r
:::\r
\r
:::demo{haircut}\r
\r
### Haircut\r
\r
You can attach a nice haircut to the button to decorate it.\r
\r
:::\r
\r
### API\r
\r
| Property   | Description | Type                | Default | Required |\r
| ---------- | ----------- | ------------------- | ------- | -------- |\r
| haircut    |             | \`boolean\`           | \`false\` |          |\r
| children   | description | \`string\`            |         |          |\r
| width      |             | \`string\` / \`number\` |         |          |\r
| height     |             | \`string\` / \`number\` |         |          |\r
| background |             | \`string\`            |         |          |\r
`;const k={"./basic.tsx":B,"./haircut.tsx":m},E={basic:p,haircut:v},C={zh:f,en:b},y=()=>n(c,{requireDemo:k,requireRaw:E,requireMd:C});export{y as default};
