import{E as e,q as t,R as n,D as r,F as a,u as o,N as s,C as i}from"./vendor.8bef1297.js";import{C as c,B as u}from"./index.55855cee.js";import{P as l}from"./PageWalker.facc56b8.js";let m=0,f=!1;const p=[];let d=e=>{p.push(e)};const E=()=>{const[e,t]=r.exports.useState([]);a((()=>{t(p),d=e=>t((t=>[...t,e]))}));const i=o((e=>{t((t=>{const n=t.findIndex((t=>t.id===e));return-1!==n?t.slice(0,n).concat(t.slice(n+1)):t}))}));return n.createElement(s,null,n.createElement("div",null,e.map((e=>n.createElement(v,{key:e.id,value:e,remove:i})))))},v=({value:e,remove:t})=>{const[a,s]=r.exports.useState([!0,!1]),u=r.exports.useRef(),l=o((()=>{s([!1,!1]),setTimeout((()=>t(e.id)),300)})),m=o((()=>{void 0!==u.current&&clearTimeout(u.current)})),f=o((()=>{u.current=setTimeout((()=>{l()}),3e3)}));return r.exports.useLayoutEffect((()=>{s([!0,!0]),f()}),[f]),n.createElement(i,{in:a[1],timeout:300,classNames:"st-notification-item"},n.createElement(c.Panel,{active:a[0],className:"st-notification-item"},n.createElement("div",{onMouseEnter:m,onMouseLeave:f},e.content)))},b={push(e){this.setup(),d({id:m++,content:e})},setup(){const r=e("Notification");f||(f=!0,t.render(n.createElement(E,null),r))}};const h={"/src/st-assets/Notification/basic.tsx":Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:()=>n.createElement(n.Fragment,null,n.createElement(u,{primary:!0,onClick:()=>b.push(n.createElement("h1",null,"abcdefg"))},"打开对话框"))})},x={basic:"import React, { useState } from 'react';\r\nimport { Button, Notification } from 'starfall';\r\n\r\nconst BasicUsage: React.FC = () => {\r\n  return (\r\n    <>\r\n      <Button primary onClick={() => Notification.push(<h1>abcdefg</h1>)}>\r\n        打开对话框\r\n      </Button>\r\n    </>\r\n  );\r\n};\r\nexport default BasicUsage;\r\n"},N={zh:"## Notification 通知提示\r\n\r\n### 基本用法\r\n\r\n打开一个通知框，里面能够嵌入任意`React`节点\r\n\r\n::demo{basic}\r\n\r\n### 接口索引\r\n",en:"## Notification\r\n"};export default()=>n.createElement(l,{requireDemo:h,requireRaw:x,requireMd:N});
