import{d as D,f as p,a4 as F,o as i,j as c,p as n,a2 as v,a3 as f,F as _,k as x,D as M,b as g,y as S,t as B,m as U,a as w,e as z,Z as o,I}from"./framework.BjwmYqAO.js";import{d as h,u as N,_ as $}from"./CalendarGrid.vue_vue_type_style_index_0_lang.CviTdNME.js";import"./theme.W1H-0ptT.js";/* empty css                                                 */const j={class:"mb-2"},G={class:"mb-2"},L=["onUpdate:modelValue"],A=D({__name:"MonthlyFunding",setup(E){const l=p(15),s=F([1500,200]),b=p(h()),d=p(h().locale("zh")),C=N(d),V=m=>{const e=d.value.date(m),a=b.value.isSame(e,"day"),[t,r]=(()=>{const u=e.month(e.month()-+(e.date()<l.value)),y=u.daysInMonth();return[e.diff(u.date(Math.min(y,l.value)),"day"),y]})(),k=1-t/r;return m?o("div",{class:{today:a}},[o("span",e.format("D")),o("div",{class:"funds"},[o("span",{class:"f3-3 clr-3"},t+" / "+r),...s.map(u=>o("div",{"data-fund-type":1},(u*k).toLocaleString("zh",{style:"currency",currency:"CNY",maximumFractionDigits:0,useGrouping:!1})))])]):o("div")};return(m,e)=>(i(),c(_,null,[n("div",j,[e[4]||(e[4]=n("h6",null,"Salary day",-1)),v(n("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>l.value=a),type:"number"},null,512),[[f,l.value]])]),n("div",G,[e[5]||(e[5]=n("h6",null,"Fundings",-1)),(i(!0),c(_,null,x(s,(a,t)=>v((i(),c("input",{"onUpdate:modelValue":r=>s[t]=r,type:"number"},null,8,L)),[[f,s[t]]])),256)),n("button",{onClick:e[1]||(e[1]=a=>s.pop())},"Remove"),n("button",{onClick:e[2]||(e[2]=a=>s.push(0))},"Add")]),M($,{class:"MonthlyFunding",modelValue:d.value,"onUpdate:modelValue":e[3]||(e[3]=a=>d.value=a),calendar:S(C),"change-on-keydown":""},{header:g(({index:a,name:t})=>[n("div",{style:U(a===6||a===0?{color:"#f35e"}:void 0)},B(t),5)]),default:g(({cell:a})=>[(i(),w(z(V(a))))]),_:1},8,["modelValue","calendar"])],64))}}),q=I(A,[["__scopeId","data-v-a05a00b9"]]);export{q as default};
