import{r as d,g as p,a as o,h as f,j as e,e as u,k as _,S as h}from"./index.e42e054f.js";import{P as v}from"./PageWalker.8f5b2b25.js";const g=({children:i})=>{d.exports.useEffect(()=>{});const a=p(),{state:r,buy:c}=a;return o(f.Provider,{value:a,children:[o("div",{className:"sf-farm",children:[e("span",{className:"sf-farm__wallet",children:r.wallet}),e("span",{className:u("sf-farm__store",r.wallet<100&&"sf-farm__store--disabled"),onClick:()=>{if(r.wallet>=100){const s={"\u{1F353}":30,"\u{1F347}":30,"\u{1F33D}":30,"\u{1F35F}":10};let t=Math.random()*100;const l=[...Object.entries(s)];let n;for(;n=l.shift();){const[F,m]=n;if(m>=t)return c(F);t-=m}}},children:"\u{1F3B2}"}),e(b,{children:[...Array(9).keys()].map(s=>e(_,{handleClick:()=>{if(r.selectedBagItem)return r.selectedBagItem}},s))})]}),e(x,{})]})},b=({children:i})=>e("div",{className:"sf-farm-field-set",children:i}),x=()=>{const{state:{bag:i,selectedBagItem:a},selectItem:r}=d.exports.useContext(f);return e("div",{className:"sf-farm-bag",children:i.map(c=>{var n;const{id:s,type:t}=c,l=(a==null?void 0:a.id)===s;return o("div",{className:u("st-farm-plant-seed",l&&"st-farm-plant-seed--active"),onClick:()=>r(c),children:[e("div",{className:"st-farm-plant-seed__image",children:t}),e("div",{className:"st-farm-plant-seed__title",children:(n=h.get(t))==null?void 0:n.name})]},s)})})},N=()=>e(g,{});var w=Object.freeze(Object.defineProperty({__proto__:null,default:N},Symbol.toStringTag,{value:"Module"})),B=`import React from 'react';\r
import { Farm } from '\u{1F984}';\r
\r
const BasicUsage: React.FC = () => {\r
  return <Farm></Farm>;\r
};\r
export default BasicUsage;\r
`,j=`## Farm \u519C\u573A\r
\r
\`Farm\`\u7528\u4E8E\u63D0\u4EA4\u6C34\u679C\uFF0C\u5728\`Field\`\u4E0A\u79CD\u690D\u79CD\u5B50\uFF0C\u7B49\u5F85\u4E00\u6BB5\u65F6\u95F4\u540E\u5B83\u4EEC\u5C06\u6210\u957F\u4E3A\u690D\u7269\u3002\r
\r
### \u57FA\u672C\u4F7F\u7528\r
\r
::demo{basic}\r
`,k=`## Farm\r
\r
\`Farm\` is used to submit fruits\uFF0Cplant seeds on \`Field\` and wait for its grow\u3002\r
\r
### Basic\r
\r
::demo{basic}\r
`;const y={"./basic.tsx":w},C={basic:B},M={zh:j,en:k},E=()=>e(v,{requireDemo:y,requireRaw:C,requireMd:M});export{E as default};
