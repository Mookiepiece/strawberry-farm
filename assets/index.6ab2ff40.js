var h=Object.defineProperty;var c=Object.getOwnPropertySymbols;var d=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var f=(t,r,e)=>r in t?h(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,u=(t,r)=>{for(var e in r||(r={}))d.call(r,e)&&f(t,e,r[e]);if(c)for(var e of c(r))b.call(r,e)&&f(t,e,r[e]);return t};var S=(t,r)=>{var e={};for(var n in t)d.call(t,n)&&r.indexOf(n)<0&&(e[n]=t[n]);if(t!=null&&c)for(var n of c(t))r.indexOf(n)<0&&b.call(t,n)&&(e[n]=t[n]);return e};import{z as y,a as j,B as w,j as v}from"./index.e42e054f.js";import{P as O}from"./PageWalker.8f5b2b25.js";function _(t,r){if(Object.is(t,r))return!0;if(typeof t!="object"||t===null||typeof r!="object"||r===null)return!1;const e=Object.keys(t);if(e.length!==Object.keys(r).length)return!1;for(let n=0;n<e.length;n++)if(!Object.prototype.hasOwnProperty.call(r,e[n])||!Object.is(t[e[n]],r[e[n]]))return!1;return!0}const k=({root:t,initialValue:r,version:e,upgradeFn:n={},storage:i})=>{var g;let o,m;try{if(o=JSON.parse(i.getItem(t)||"throws an error"),o){if(typeof o.meta.version!="number"||o.meta.version>e)throw new Error;if(m=o.meta.version,Number((g=Object.keys(n)[0])!=null?g:e)>o.meta.version)throw new Error;Object.entries(n).filter(([s])=>Number(s)<e||Number(s)>o.meta.version).forEach(([,s])=>{o=s(o)})}}catch{o=u({meta:{version:e}},r)}JSON.stringify(o)!==i.getItem(t)&&i.setItem(t,JSON.stringify(o));const l=o,{meta:U}=l,p=S(l,["meta"]),a=y(()=>p);return a.subscribe(s=>{i.setItem(t,JSON.stringify(u({meta:{version:e}},s)))}),{meta:{version:e,versionBeforeUpgrade:m},useStore:a,get:a.getState,set:a.setState,subscribe:a.subscribe}},x=(t,r,e)=>[t.useStore(r,r?e!=null?e:_:void 0),t.set],B=k({root:"demo",version:1,initialValue:{count:0},storage:sessionStorage}),N=()=>{const[t,r]=x(B);return j(w,{onClick:()=>r(({count:e})=>({count:e+1})),children:["Count: ",t.count]})};var C=Object.freeze(Object.defineProperty({__proto__:null,default:N},Symbol.toStringTag,{value:"Module"})),R=`import React from 'react';\r
import { Button } from '\u{1F984}';\r
import { useStorage, versionedStorage } from '\u{1F984}/shared';\r
\r
const demo_storage = versionedStorage({\r
  root: 'demo',\r
  version: 1,\r
  initialValue: { count: 0 },\r
  storage: sessionStorage,\r
});\r
\r
const BasicUsage: React.FC = () => {\r
  const [state, setState] = useStorage(demo_storage);\r
\r
  return (\r
    <Button onClick={() => setState(({ count }) => ({ count: count + 1 }))}>\r
      Count: {state.count}\r
    </Button>\r
  );\r
};\r
export default BasicUsage;\r
`,V=`## Versioned Storage \u7248\u672C\u50A8\u5B58\r
\r
\u4E0D\u5C11\u5E93\u63A8\u51FA \`useStorage\`\uFF0C \u4F46\u6216\u8BB8\u5E94\u7528\u9700\u8981\u7684\u662F\u4E00\u4E2A\u66F4\u5F3A\u7684\u57FA\u4E8E\`Storage\`\u7684\u5C01\u88C5\uFF1A\r
\r
- \`Versioned Storage\`\u53EF\u4EE5\u4F9D\u636E\u7248\u672C\u53F7\u8FDB\u884C\u5347\u7EA7\uFF08\u6216\u8005\u7206\u7834\uFF09\uFF0C\u65B0\u7248\u672C\u6570\u636E\u7ED3\u6784\u53D8\u5316\u4E0D\u7528\u62C5\u5FC3\u65E7\u6570\u636E\u517C\u5BB9\u3002\r
- \u53EF\u4EE5\u5728\u7EC4\u4EF6\u5916\u8BBF\u95EE\u3002\r
\r
> \u8FD8\u80FD\u518D\u8FDB\u9636\uFF0C\u62FF\u6765\u81EA\u6B3A\u6B3A\u4EBA\uFF1A [https://juejin.cn/post/7104301566857445412](https://juejin.cn/post/7104301566857445412)\u3002\r
\r
### Basic\r
\r
::demo{basic}\r
`,I=`## Versioned Storage\r
\r
Many libs exports their \`useStorage\` hook\uFF0C but I think we'd do sth with \`Storage\` itself instead:\r
\r
- \`Versioned Storage\` can update(or explode) itself with a new version number, so you don't worry about breaking changes on the stored stale data.\r
- Can be accessed outside of react components.\r
\r
> But also, you can make it more verbose: [https://juejin.cn/post/7104301566857445412](https://juejin.cn/post/7104301566857445412)\u3002\r
\r
### Basic\r
\r
::demo{basic}\r
`;const P={"./basic.tsx":C},z={basic:R},J={zh:V,en:I},T=()=>v(O,{requireDemo:P,requireRaw:z,requireMd:J});export{T as default};
