import{d as L,z as O,A as g,a8 as P,c as u,f as B,o as i,i as c,F as x,j as V,x as D,l as K,n as N,a0 as $,m as R,r as T,I as U,t as q,a as A,e as C,$ as G}from"./framework.IkYOgTiJ.js";import{w as H}from"./theme.i3CGoA02.js";const J=["id","tabindex","aria-disabled","aria-activedescendant","aria-multiselectable"],Q=["aria-label"],W={role:"none"},Z=L({__name:"VListbox",props:O({mode:{},powerPointer:{type:Boolean},options:{},disabled:{type:Boolean},class:{},style:{type:[Boolean,null,String,Object,Array]}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(w,{expose:S}){const s=g(w,"modelValue"),o=w,b=P(),v=H(),k=u(()=>{let e=0;const l=a=>{const n=typeof a=="object"&&a?a.value:a,d=e++;return{label:typeof a=="object"&&a?a.label??a.value:""+a,value:n,disabled:typeof a=="object"&&a&&a.disabled||!1,index:d,selected:p.value?s.value.includes(n):n===s.value,current:t.value===d}};return(o.options??[]).map(a=>a&&typeof a=="object"&&"options"in a?{...a,options:a.options.map(l)}:l(a))}),r=u(()=>k.value.flatMap(e=>e&&typeof e=="object"&&"options"in e?e.options:e)),t=B(-1),m=u(()=>t.value>=0&&t.value<r.value.length),M=u(()=>o.mode==="clearable"),p=u(()=>o.mode==="multi"),z=u(()=>o.mode==="cursor"),E=()=>{m.value||(t.value=r.value.findIndex(e=>e.value===(p.value?s.value.includes(e.value):s.value)),t.value===-1&&r.value.length&&(t.value=0))},y=e=>{if(p.value){const l=new Set(s.value);l.has(e)?l.delete(e):l.add(e),s.value=[...l];return}M.value&&s.value===e?s.value=null:s.value=e},h=B(null),_=e=>{var d;const l=r.value.slice(0,t.value),n=[...r.value.slice(t.value+1),...l][e<0?"findLast":"find"](f=>!f.disabled);if(n){const f=r.value.indexOf(n);return t.value=f,(d=document.getElementById(v+t.value))==null||d.scrollIntoView(),z.value&&y(n.value),f}return-1},F=()=>{m.value&&y(r.value[t.value].value)},I=e=>{if(!o.disabled)switch(e.key){case"ArrowUp":case"ArrowLeft":e.preventDefault(),_(-1);break;case"ArrowDown":case"ArrowRight":e.preventDefault(),_(1);break;case" ":case"Enter":e.preventDefault(),F();break}};S({el:h});const j=e=>{var l;return G("div",{id:v+e.index,onClick:e.disabled?void 0:()=>y(e.value),role:"option","aria-selected":e.selected||void 0,"aria-current":e.current||void 0,onPointermove:o.powerPointer?()=>void(t.value=e.index):void 0,"aria-disabled":o.disabled||e.disabled||void 0},((l=b.default)==null?void 0:l.call(b,{option:e}))||e.label)};return(e,l)=>(i(),c("div",{ref_key:"el",ref:h,id:D(v),style:K(o.style),class:N(o.class),onFocus:E,onKeydown:$(I,["self","exact"]),role:"listbox",tabindex:o.disabled?-1:0,"aria-disabled":o.disabled,"aria-activedescendant":m.value?D(v)+t.value:void 0,"aria-multiselectable":p.value},[(i(!0),c(x,null,V(k.value,a=>(i(),c(x,{key:a&&typeof a=="object"&&"options"in a?"g"+a.label:"i"+a.value},[a&&typeof a=="object"&&"options"in a?(i(),c("div",{key:0,role:"group","aria-label":a.label},[R("div",W,[T(e.$slots,"title",{group:a},()=>[U(q(a.label),1)])]),(i(!0),c(x,null,V(a.options,n=>(i(),A(C(j(n)),{key:n.index}))),128))],8,Q)):(i(),A(C(j(a)),{key:1}))],64))),128))],46,J))}});export{Z as _};
