import{f as d,c as o}from"./framework.qiMOmzvi.js";const g=(l=0,r)=>{const c=d(l),n=o({get(){const e=c.value;return e<0||e>=r.value.length||r.value[e]<0?r.value.findIndex(u=>u>=0):c.value},set:e=>c.value=e});return{current:n,nav:(e,u=!1)=>{const s=r.value,i=(()=>{switch(e){case-1/0:return s.findIndex(t=>t>=0);case 1/0:return s.findLastIndex(t=>t>=0);case-1:case 1:{const t=!u&&e===1?[]:s.slice(0,n.value),f=!u&&e===-1?[]:s.slice(n.value+1),a=[...f,...t][e<0?"findLastIndex":"findIndex"](v=>v>=0);return a<0?-1:a<f.length?n.value+1+a:a-f.length}default:return-1}})();if(!(i<0))return n.value=i}}};export{g as u};
