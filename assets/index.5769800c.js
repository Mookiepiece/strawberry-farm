import{r as a,q as i,a as l,F as d,j as e,B as o,C as p,b as g}from"./index.085f51cf.js";import{P as f}from"./PageWalker.10e4a88d.js";var B=function(r,t){return typeof t=="boolean"?t:!r},m=function(r){return a.exports.useReducer(B,r)},x=m;const v=()=>{const[r,t]=a.exports.useState(null),[u,c]=a.exports.useState(null),[n,s]=x(!1);return i(n?[r,u]:[],()=>{s(!1)}),l(d,{children:[e(o,{ref:t,onClick:s,children:"Expand"}),e("div",{style:{width:"max-content"},children:e(p,{ref:c,children:n?l(g,{horizontal:!0,className:"p-10",gap:2,children:[e(o,{children:"A"}),e(o,{children:"B"}),e(o,{children:"C"})]}):null})})]})};var C=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"})),h=`import React, { useEffect, useRef, useState } from 'react';\r
import { useToggle } from 'react-use';\r
import { Box, Button, Collapse } from '\u{1F984}';\r
import { useClickAway } from '\u{1F984}/shared';\r
\r
const BasicUsage: React.FC = () => {\r
  const [button, setButton] = useState<HTMLButtonElement | null>(null);\r
  const [collapseDiv, setCollapseDiv] = useState<HTMLDivElement | null>(null);\r
\r
  const [expanded, toggleExpanded] = useToggle(false);\r
\r
  useClickAway(expanded ? [button, collapseDiv] : [], () => {\r
    toggleExpanded(false);\r
  });\r
\r
  return (\r
    <>\r
      <Button ref={setButton} onClick={toggleExpanded}>\r
        Expand\r
      </Button>\r
      <div style={{ width: 'max-content' }}>\r
        <Collapse ref={setCollapseDiv}>\r
          {expanded ? (\r
            <Box horizontal className="p-10" gap={2}>\r
              <Button>A</Button>\r
              <Button>B</Button>\r
              <Button>C</Button>\r
            </Box>\r
          ) : null}\r
        </Collapse>\r
      </div>\r
    </>\r
  );\r
};\r
\r
export default BasicUsage;\r
`,b=`## useClickAway \u4F7F\u7528\u5916\u90E8\u70B9\u51FB\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
::demo{basic}\r
`,y=`## useClickAway\r
\r
### Basic\r
\r
::demo{basic}\r
`;const E={"./basic.tsx":C},k={basic:h},w={zh:b,en:y},A=()=>e(f,{requireDemo:E,requireRaw:k,requireMd:w});export{A as default};
