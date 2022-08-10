var c=Object.defineProperty,i=Object.defineProperties;var d=Object.getOwnPropertyDescriptors;var e=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var a=(n,r,t)=>r in n?c(n,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[r]=t,o=(n,r)=>{for(var t in r||(r={}))m.call(r,t)&&a(n,t,r[t]);if(e)for(var t of e(r))p.call(r,t)&&a(n,t,r[t]);return n},s=(n,r)=>i(n,d(r));import{z as l,a as b,B as f,j as g}from"./index.085f51cf.js";import{P as w}from"./PageWalker.10e4a88d.js";const u=l(()=>({count:1})),B=()=>{const{count:n}=u();return b(f,{onClick:()=>u.setState(r=>s(o({},r),{count:r.count+1})),children:["Count: ",n]})};var z=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"})),S=`import React from 'react';\r
import { Button } from '\u{1F984}';\r
import { zustand } from '\u{1F984}/shared';\r
\r
const useStore = zustand(() => ({ count: 1 }));\r
\r
const BasicUsage: React.FC = () => {\r
  const { count } = useStore();\r
\r
  return (\r
    <Button onClick={() => useStore.setState(s => ({ ...s, count: s.count + 1 }))}>\r
      Count: {count}\r
    </Button>\r
  );\r
};\r
\r
export default BasicUsage;\r
`,h="## Zustand \u72B6\u6001\r\n\r\n[zustand](https://www.npmjs.com/package/zustand) \u662F `react` \u72B6\u6001\u7BA1\u7406\u5E93\u3002\u4F46\u9ED8\u8BA4\u7684 `merge` \u6A21\u5F0F\u4E0D\u7B26\u5408 `hooks` \u65F6\u4EE3\u7684\u76F4\u89C9\u3002\r\n\r\n`strawberry-farm` \u8986\u76D6\u4E86\u6B64\u9ED8\u8BA4\u884C\u4E3A\uFF0C\u73B0\u5728\u9ED8\u8BA4\u884C\u4E3A\u662F `replace` \u6A21\u5F0F\u3002\r\n\r\n> `Form`\u7EC4\u4EF6\u548C`Versioned Storage`\u63A5\u53E3\u90FD\u4F9D\u8D56\u4E8E`Zustand`\u5B9E\u73B0\u3002\r\n\r\n### Basic\r\n\r\n::demo{basic}\r\n",_="## Zustand\r\n\r\n[zustand](https://www.npmjs.com/package/zustand) is a state management library. But `merge` mode by default is not expected to us as we are familiar to `hooks`.\r\n\r\n`strawberry-farm`overrides this behavior, now it's `replace` mode by default.\r\n\r\n> `Form` component and `Versioned Storage` api are built upon `Zustand`.\r\n\r\n### Basic\r\n\r\n::demo{basic}\r\n";const j={"./basic.tsx":z},k={basic:S},v={zh:h,en:_},F=()=>g(w,{requireDemo:j,requireRaw:k,requireMd:v});export{F as default};
