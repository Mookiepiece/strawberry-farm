import{r as n,o as a,j as s,B as c}from"./index.e42e054f.js";import{P as l}from"./PageWalker.8f5b2b25.js";const i=()=>{const[t,u]=n.exports.useState(0),r=a(()=>(u(t+1),t)),o=n.exports.useRef(null);return n.exports.useEffect(()=>{const e=o.current;!e||(e.innerText=`Count: ${r()}`,e.addEventListener("click",()=>{e.innerText=`Count: ${r()}`}))},[]),s(c,{ref:o})};var f=Object.freeze(Object.defineProperty({__proto__:null,default:i},Symbol.toStringTag,{value:"Module"})),b=`import React, { useEffect, useRef, useState } from 'react';\r
import { Button } from '\u{1F984}';\r
import { useEventCallback } from '\u{1F984}/shared';\r
\r
const BasicUsage: React.FC = () => {\r
  const [count, setCount] = useState(0);\r
  const getCount = useEventCallback(() => {\r
    setCount(count + 1);\r
    return count;\r
  });\r
\r
  const buttonRef = useRef<HTMLButtonElement>(null);\r
  useEffect(() => {\r
    const el = buttonRef.current;\r
    if (!el) return;\r
      el.innerText = \`Count: \${getCount()}\`;\r
      el.addEventListener('click', () => {\r
        el.innerText = \`Count: \${getCount()}\`;\r
      });\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  return <Button ref={buttonRef}></Button>;\r
};\r
\r
export default BasicUsage;\r
`,d=`## useEventCallback \u4F7F\u7528\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\r
\r
\u5728 \`useEvent\` \u4E4B\u524D\u7684\u5B98\u65B9\u89E3\u51B3\u65B9\u6848\u3002\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
::demo{basic}\r
`,C=`## useSingletonAsyncFn\r
\r
The offical solution before \`useEvent\` was filed.\r
\r
### Basic\r
\r
::demo{basic}\r
`;const m={"./basic.tsx":f},v={basic:b},g={zh:d,en:C},E=()=>s(l,{requireDemo:m,requireRaw:v,requireMd:g});export{E as default};
