import{d as m,f as x,c as b,o as l,i as n,m as s,F as r,j as i,n as _,t as p,a as h,b as g,e as w}from"./framework.p8HH8TNW.js";const C={class:"sf-table"},v=s("colgroup",null,[s("col",{style:{width:"80px"}}),s("col",{style:{width:"80px"}}),s("col",{style:{width:"80px"}}),s("col",{style:{width:"80px"}}),s("col",{style:{width:"80px"}}),s("col",{style:{width:"80px"}}),s("col",{style:{width:"80px"}}),s("col",{style:{width:"40px"}})],-1),F={class:"__cell"},k={class:"__cell"},B=m({__name:"VTable",setup(y){const u=x(["<<Period","Mon","Tue","Wed","Thu","Fri","Sat>>","Sun>>"]),o=b(()=>u.value.map(t=>{const c=t.startsWith("<<"),e=t.endsWith(">>"),a={name:c?t.substring(2):e?t.substring(0,t.length-2):t,classes:[]};return c&&a.classes.push("--start"),e&&a.classes.push("--end"),a})),f=[["a.m.","Clean room","Football training","Dance Course","History Class","Buy drinks","Study hour","Free time"],["p.m.","Yoga","Chess Club","Meet friends","Gymnastics","Birthday party","Fishing trip","Free time"]];return(t,c)=>(l(),n("div",C,[s("table",null,[v,s("tr",null,[(l(!0),n(r,null,i(o.value,e=>(l(),n("th",{key:e.name,class:_(e.classes)},[s("div",F,p(e.name),1)],2))),128))]),(l(),n(r,null,i(f,e=>s("tr",null,[(l(!0),n(r,null,i(e,(d,a)=>(l(),h(w(a===0?"th":"td"),{key:a,class:_(o.value[a].classes)},{default:g(()=>[s("div",k,p(d),1)]),_:2},1032,["class"]))),128))])),64))])]))}}),T=m({__name:"Table",setup(y){return(u,o)=>(l(),h(B))}});export{T as default};
