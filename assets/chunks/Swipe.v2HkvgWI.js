import{b as y}from"./theme.KnmxTxGm.js";import{d as x,e as s,f as _,o as m,h as u,l as f,I as d}from"./framework.q6r8hxCe.js";const v=x({__name:"Swipe",setup(k){const n=s(),r=s(),a=s();return _(()=>{const[e,o]=[n.value,a.value];!e||!o||y(e,l=>{const c={x:l.clientX,y:l.clientY};let t={x:0,y:0};return({e:i,done:p})=>{t={x:i.clientX-c.x,y:i.clientY-c.y},p?(r.value.innerText="{}",e.style.setProperty("transform","translate(0px, 0px)"),e.style.setProperty("transition","transform .3s")):(r.value.innerText=JSON.stringify(t),e.style.removeProperty("transition"),e.style.setProperty("transform",`translate(${t.x}px,${t.y}px)`))}})}),(e,o)=>(m(),u("div",{class:"z [B] [CC] \\{+}",ref_key:"container",ref:a},[f("div",{ref_key:"elRef",ref:n,class:"\\{+}"},null,512),f("samp",{ref_key:"infoRef",ref:r,class:"\\{*}/",style:{"--y":"10px"}},"{}",512)],512))}}),R=d(v,[["__scopeId","data-v-9d9884a1"]]);export{R as default};
