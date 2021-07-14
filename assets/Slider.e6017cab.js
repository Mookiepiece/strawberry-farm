import{D as e,u as t,R as n,c as r,b as l}from"./vendor.335fc97d.js";import"./index.7e79db5c.js";import{P as a}from"./PageWalker.753a2d62.js";const s={vertical:{offsetSize:"offsetHeight",scrollValue:"scrollTop",scrollSize:"scrollHeight",size:"height",axis:"Y",mouseEventClientValue:"clientY",clientRectStart:"top"},horizontal:{offsetSize:"offsetWidth",scrollValue:"scrollLeft",scrollSize:"scrollWidth",size:"width",axis:"X",mouseEventClientValue:"clientX",clientRectStart:"left"}},i=[],o=({min:a=0,max:o=100,step:m=1,label:d=i})=>{const[u,v]=e.exports.useState(a),p=(u-a)/(o-a)*100,h=t(((e,t=a,n=o)=>Math.max(t,Math.min(e,n)))),f=e.exports.useRef(null),g=e.exports.useMemo((()=>d.map((({value:e,label:t})=>({value:e,label:t,percentage:Math.round((e-a)/(o-a)*100)})))),[d,o,a]),E=t((({mouse:{x:e,y:t}})=>{if(!f.current)return;const{width:n,left:r}=f.current.getBoundingClientRect(),l=(e-r)/n;if("number"==typeof m){const e=h(m*Math.round(l*(o-a)/m)+a);v(e)}else v(g[c(g.map((({percentage:e})=>e)),100*l)].value)})),{active:b,handleStart:_}=(({direction:n,onChange:r})=>{const[a,s]=e.exports.useState(!1),i=t((e=>{e.stopPropagation(),e.preventDefault();const t=(e=>"touches"in e?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY})(e);null==r||r({mouse:t})})),o=t((()=>{s(!1),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",o),document.removeEventListener("touchmove",i),document.removeEventListener("touchend",o),document.removeEventListener("touchcancel",o)})),c=t((e=>{s(!0),i(e.nativeEvent),document.addEventListener("mousemove",i),document.addEventListener("mouseup",o),document.removeEventListener("touchmove",i),document.removeEventListener("touchend",o),document.removeEventListener("touchcancel",o)}));return l(o),{active:a,handleStart:c,handleDrag:i,handleEnd:o}})({direction:s.horizontal,onChange:E});return n.createElement("div",{className:r("st-slider",b&&"st-slider--active")},n.createElement("div",{className:"st-slider__labels"},g.map((({label:e,value:t,percentage:r})=>n.createElement("div",{className:"st-slider__label-item",key:t,onClick:()=>v(t),style:{left:r+"%"}},n.createElement("div",{className:"st-slider__label-item__inner"},e||t))))),n.createElement("input",{type:"range",className:"st-slider__input-el",onKeyDown:e=>{switch(e.key){case"ArrowRight":case"ArrowUp":e.preventDefault(),(()=>{if(null===m){const e=c(g.map((({percentage:e})=>e)),p);v(g[h(e+1,0,g.length-1)].value)}else v(h(u+m))})();break;case"ArrowLeft":case"ArrowDown":e.preventDefault(),(()=>{if(null===m){const e=c(g.map((({percentage:e})=>e)),p);v(g[h(e-1,0,g.length-1)].value)}else v(h(u-m))})()}}}),n.createElement("div",{className:"st-slider__rail",ref:f,onMouseDown:_,onTouchStart:_},n.createElement("div",{className:"st-slider__fill",style:{width:p+"%"}}),n.createElement("div",{className:"st-slider__thumb",style:{left:p+"%"}},n.createElement("div",{className:"st-slider__tooltip"},u))))},c=(e,t)=>t<=e[0]?0:t>=e[e.length-1]?e.length-1:e.reduce(((n,r,l)=>{if("number"==typeof n)return n;if(e.length-1!==l){const n=e[l+1];if(r<=t&&t<n)return t-r>n-t?l+1:l}}),void 0);const m={"/src/st-assets/Slider/basic.tsx":Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:()=>n.createElement(n.Fragment,null,n.createElement("div",{style:{padding:40}},n.createElement(o,null)),n.createElement("div",{style:{padding:40}},n.createElement(o,{min:10,max:20,step:2,label:[{value:14}]})),n.createElement("div",{style:{padding:40}},n.createElement(o,{min:101,max:201,step:2,label:[{value:114}]}))," ",n.createElement("div",{style:{padding:40}},n.createElement(o,{min:101,max:201,step:null,label:[{value:101},{value:114},{value:133},{value:201}]})))})},d={basic:"import React from 'react';\r\nimport { Slider } from 'starfall';\r\n\r\nconst BasicUsage: React.FC = () => {\r\n  return (\r\n    <>\r\n      <div style={{ padding: 40 }}>\r\n        <Slider />\r\n      </div>\r\n      <div style={{ padding: 40 }}>\r\n        <Slider\r\n          min={10}\r\n          max={20}\r\n          step={2}\r\n          label={[\r\n            {\r\n              value: 14,\r\n            },\r\n          ]}\r\n        />\r\n      </div>\r\n      <div style={{ padding: 40 }}>\r\n        <Slider\r\n          min={101}\r\n          max={201}\r\n          step={2}\r\n          label={[\r\n            {\r\n              value: 114,\r\n            },\r\n          ]}\r\n        />\r\n      </div>{' '}\r\n      <div style={{ padding: 40 }}>\r\n        <Slider\r\n          min={101}\r\n          max={201}\r\n          step={null}\r\n          label={[\r\n            {\r\n              value: 101,\r\n            },\r\n            {\r\n              value: 114,\r\n            },\r\n            {\r\n              value: 133,\r\n            },\r\n            {\r\n              value: 201,\r\n            },\r\n          ]}\r\n        />\r\n      </div>\r\n    </>\r\n  );\r\n};\r\nexport default BasicUsage;\r\n"},u={zh:"## Slider 滑块\r\n\r\n### 基本用法\r\n\r\nTODO: 添加越界 label 判断\r\n\r\n::demo{basic}\r\n",en:""};export default()=>n.createElement(a,{requireDemo:m,requireRaw:d,requireMd:u});
