var S=Object.defineProperty,F=Object.defineProperties;var q=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var N=(r,e,o)=>e in r?S(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o,u=(r,e)=>{for(var o in e||(e={}))_.call(e,o)&&N(r,o,e[o]);if(d)for(var o of d(e))k.call(e,o)&&N(r,o,e[o]);return r},h=(r,e)=>F(r,q(e));var M=(r,e)=>{var o={};for(var p in r)_.call(r,p)&&e.indexOf(p)<0&&(o[p]=r[p]);if(r!=null&&d)for(var p of d(r))e.indexOf(p)<0&&k.call(r,p)&&(o[p]=r[p]);return o};import{r as m,m as b,j as s,P as L,R as U,a as z,B as y}from"./index.085f51cf.js";import{P as H}from"./PageWalker.10e4a88d.js";const B=v=>{var E=v,{trigger:r,timeout:e,children:o,closeOnClickOutside:p,popup:l}=E,f=M(E,["trigger","timeout","children","closeOnClickOutside","popup"]);const[j,g]=m.exports.useState(0),x=!!j,[i]=m.exports.useState(()=>new Map),w=m.exports.useCallback(t=>{i.has(t)&&(clearTimeout(i.get(t)),i.delete(t))},[i]),n=b(t=>{w(t),i.set(t,setTimeout(()=>g(P=>P|t),t===2||t===8?e||300:e||0))}),a=b(t=>{w(t),i.set(t,setTimeout(()=>g(P=>P&~t),t===2||t===8?e||300:e||0))}),c=b(t=>x?a(t):n(t)),{popupProps:T,referenceElProps:R}=m.exports.useMemo(()=>{if(r==="click")return W({hide:a,show:n,toggle:c});if(r==="focus")return C({hide:a,show:n,toggle:c});if(r==="hover")return{popupProps:u(u({},C({hide:a,show:n,toggle:c}).popupProps),O({hide:a,show:n,toggle:c}).popupProps),referenceElProps:u(u({},C({hide:a,show:n,toggle:c}).referenceElProps),O({hide:a,show:n,toggle:c}).referenceElProps)};throw new Error},[a,n,c,r]);return s(L,h(u({},f),{popup:s("div",h(u({},T),{children:l})),visible:x,onClose:()=>g(0),closeOnClickOutside:typeof p=="boolean"?p:r!=="hover",children:U.cloneElement(o,u({},D(o,R)))}))},W=({toggle:r})=>({referenceElProps:{onClick:()=>r(1)}}),O=({hide:r,show:e})=>({popupProps:{onMouseEnter:()=>e(8),onMouseLeave:()=>r(8)},referenceElProps:{onMouseEnter:()=>e(2),onMouseLeave:()=>r(2)}}),C=({hide:r,show:e})=>({referenceElProps:{onFocus:()=>e(4),onBlur:()=>r(4)}}),D=(r,e)=>Object.fromEntries(Object.entries(e).map(([o,p])=>o.startsWith("on")&&typeof p=="function"?[o,(...l)=>{var f,v;(v=(f=r.props)[o])==null||v.call(f,...l),p(...l)}]:[o,p])),V=()=>z("div",{style:{display:"grid",gap:20,gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))"},children:[s(B,{popup:s("p",{children:"asdsd"}),trigger:"focus",popupClassName:"sf-popper--default",children:s(y,{primary:!0,children:"trigger=`focus`"})}),s(B,{popup:s("p",{children:"asdsd"}),popupClassName:"sf-popper--default",trigger:"click",children:s(y,{primary:!0,children:"trigger=`click`"})}),s(B,{popup:s("p",{children:"Note that this will also trigger on focus because i want it to be accessable"}),popupClassName:"sf-popper--default",trigger:"hover",children:s(y,{primary:!0,children:"trigger=`hover` "})})]});var A=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"})),G=`import React, { useState } from 'react';\r
import { Button, Popover } from '\u{1F984}';\r
\r
const BasicUsage: React.FC = () => {\r
  return (\r
    <div\r
      style={{\r
        display: 'grid',\r
        gap: 20,\r
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',\r
      }}\r
    >\r
      <Popover popup={<p>asdsd</p>} trigger="focus" popupClassName="sf-popper--default">\r
        <Button primary>trigger=\`focus\`</Button>\r
      </Popover>\r
      <Popover popup={<p>asdsd</p>} popupClassName="sf-popper--default" trigger="click">\r
        <Button primary>trigger=\`click\`</Button>\r
      </Popover>\r
      <Popover\r
        popup={<p>Note that this will also trigger on focus because i want it to be accessable</p>}\r
        popupClassName="sf-popper--default"\r
        trigger="hover"\r
      >\r
        <Button primary>trigger=\`hover\` </Button>\r
      </Popover>\r
    </div>\r
  );\r
};\r
export default BasicUsage;\r
`,I=`## Popover \u5F39\u51FA\r
\r
\`Popover\` \u63D0\u4F9B \`trigger\` \u5C5E\u6027\u7B80\u5316\u4E86 \`Popper\` \u7684\u4F7F\u7528\u3002\r
\r
:::demo{popover}\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
:::\r
`,J=`## Popover \u5F39\u51FA\r
\r
\`Popover\` provides \`trigger\` based on \`Popper\` to reduce works on implementation.\r
\r
:::demo{popover}\r
\r
### Basic\r
\r
:::\r
`;const K={"./popover.tsx":A},Q={popover:G},X={zh:I,en:J},rr=()=>s(H,{requireDemo:K,requireRaw:Q,requireMd:X});export{rr as default};
