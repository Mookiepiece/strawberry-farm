import{d as f,e as a,a9 as d,q as m,o as v,h as _,l as o,a as h,B as g,w as k,aa as w,a8 as B,j as b,ab as y,ac as x}from"./framework.q6r8hxCe.js";import{l as r,B as C}from"./theme.KnmxTxGm.js";const N={style:{position:"relative",height:"300px",width:"100%",overflow:"auto"}},V={style:{width:"500%",height:"1000px"}},A={class:"vp-demo-levitate-vue-animated 🍒 p-6"},D=f({__name:"LevitateVueAnimated",setup(L){const e=a(!1),s=a(!1),n=a(),u=a(),i=C();d(i);const c=r.plugins.flip();m(()=>[u.value,e.value],([l,t])=>{i(),t&&l&&i(r.auto(n.value,()=>{r(n.value,l,{offset:10},c)}))});const p=()=>{e.value?e.value=!1:(e.value=!0,s.value=!0)};return(l,t)=>(v(),_("div",N,[o("div",V,[o("button",{ref_key:"button",ref:n,class:"sf-button mat:dusty",onClick:p},"Nike",512),e.value||s.value?(v(),h(B,{key:0,to:"body"},[o("div",{ref_key:"popper",ref:u,class:"vp-demo-levitate-vue-animated-container fixed (///)"},[g(w,{appear:"",onAfterLeave:t[0]||(t[0]=T=>s.value=!1)},{default:k(()=>[y(o("div",A," Content ",512),[[x,e.value]])]),_:1})],512)])):b("",!0)])]))}});export{D as default};
