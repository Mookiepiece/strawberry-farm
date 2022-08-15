import{r as o,t as h,a as t,F,B as a,j as c,b as i}from"./index.e42e054f.js";import{P as b}from"./PageWalker.8f5b2b25.js";const u=["\u{1F353}","\u{1F354}","\u{1F950}","\u{1F96A}","\u{1F36D}"],p=()=>new Promise(e=>setTimeout(e,Math.random()*2e3)),B=()=>{const[e,l]=o.exports.useState("\u{1F950}"),[d,n]=o.exports.useState([]),[m,y]=o.exports.useState(e),[g,x]=h(async r=>{n(s=>[...s,` [ loading (${r}) ] `]),await p()});return t(F,{children:[t(a,{onClick:()=>{const r=u[(u.indexOf(e)+1)%u.length];l(r),g(r).then(()=>{n(s=>s.slice(1)),y(r)}).catch(alert)},children:["I will have order: ",e]}),c(a,{textual:!0,onClick:()=>{x(),n([])},children:"cancel"}),t(i,{className:"my-50",children:["Queue: ",d.join(",")]}),t(i,{className:"my-50",children:["Your order is: ",m]})]})};var q=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"})),S=`import React, { useState } from 'react';\r
import { Box, Button } from '\u{1F984}';\r
import { useSingletonAsyncFn } from '\u{1F984}/shared';\r
\r
const menu = ['\u{1F353}', '\u{1F354}', '\u{1F950}', '\u{1F96A}', '\u{1F36D}'];\r
\r
const query = () => new Promise(r => setTimeout(r, Math.random() * 2000));\r
\r
const BasicUsage: React.FC = () => {\r
  const [id, setId] = useState('\u{1F950}');\r
\r
  const [queue, setQueue] = useState<string[]>([]);\r
  const [queryResult, setQueryResult] = useState<string>(id);\r
\r
  const [excute, cancel] = useSingletonAsyncFn(async (id: string) => {\r
    setQueue(q => [...q, \` [ loading (\${id}) ] \`]);\r
    await query();\r
  });\r
\r
  return (\r
    <>\r
      <Button\r
        onClick={() => {\r
          const nextId = menu[(menu.indexOf(id) + 1) % menu.length];\r
          setId(nextId);\r
          excute(nextId)\r
            .then(() => {\r
              setQueue(q => q.slice(1));\r
              setQueryResult(nextId);\r
            })\r
            .catch(alert);\r
        }}\r
      >\r
        I will have order: {id}\r
      </Button>\r
      <Button\r
        textual\r
        onClick={() => {\r
          cancel();\r
          setQueue([]);\r
        }}\r
      >\r
        cancel\r
      </Button>\r
      <Box className="my-50">Queue: {queue.join(',')}</Box>\r
      <Box className="my-50">Your order is: {queryResult}</Box>\r
    </>\r
  );\r
};\r
export default BasicUsage;\r
`,f=`## useSingletonAsyncFn \u4F7F\u7528\u5355\u4F8B\u5F02\u6B65\u51FD\u6570\r
\r
\`useSingletonAsyncFn\`\u53EF\u4EE5\u4FDD\u8BC1\u5F02\u6B65\u51FD\u6570\u540C\u65F6\u53EA\u6709\u4E00\u4E2A\u5728\u6267\u884C\uFF0C\u671F\u95F4\u90E8\u5206\u89E6\u53D1\u53EF\u80FD\u88AB\u5FFD\u7565\uFF0C\u4F46\u6700\u540E\u4E00\u6B21\u89E6\u53D1\u5FC5\u5B9A\u4F1A\u6267\u884C\u3002\u4F1A\u629B\u9519\uFF0C\u8BF7\u6CE8\u610F\u5F02\u5E38\u5904\u7406\u3002\r
\r
> \u5982\u679C\u8FD9\u4E2A\u6A21\u5F0F\u4E0D\u591F\u7528\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u57FA\u4E8E\u793E\u533A\u7684\`bluebird\` ~~(nativebird)~~ \u8FD9\u7C7B\`Promise\`\u6269\u5C55\u6216\u8005\`plimited\`\u8FD9\u7C7B\u5F02\u6B65\u7BA1\u7406\u6C60\u80FD\u529B\u4F1A\u66F4\u5F3A\u3002\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
::demo{basic}\r
`,w=`## useSingletonAsyncFn\r
\r
\`useSingletonAsyncFn\` will make sure an async function only has no more than one active call one time, some trigger actions may be omitted, but the lastest trigger action is promised to be excuted and return the latest result; It will throws errors.\r
\r
> Consider using promise extensions like \`bluebird\` ~~(nativebird)~~ or async pool management library like \`plimited\` if this pattern is not what you need.\r
\r
### Basic\r
\r
::demo{basic}\r
`;const I={"./basic.tsx":q},v={basic:S},Q={zh:f,en:w},k=()=>c(b,{requireDemo:I,requireRaw:v,requireMd:Q});export{k as default};
