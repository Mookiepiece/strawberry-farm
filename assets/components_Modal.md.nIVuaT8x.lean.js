import{I as a,m as t,o as s,h as d,B as n,J as l,l as o}from"./chunks/framework.q6r8hxCe.js";const V=JSON.parse('{"title":"Modal","description":"","frontmatter":{},"headers":[],"relativePath":"components/Modal.md","filePath":"components/Modal.md"}'),c={name:"components/Modal.md"},r=l("",3),m=o("p",null,"关于模态框如何兼容安卓回退的问题，之前试过模态框挂监听器取消回退的方案，却不能适合首屏。",-1),p=o("p",null,"到最后应该还是在任意模态框都加入 pushState() + 1， 这部分 vue-router 是没办法发现变化，回去也没办法发现变化，只有刷新的时候知道。",-1),_=o("p",null,"另外就是在模态框出现跳转功能时要尤其注意先关闭再做跳转，这是一个负担，为了之后能支持跳转太慢容易重复点击的防误触机制，也应该考虑使用 App.jump()。",-1);function i(u,h,f,M,b,y){const e=t("VPDemo");return s(),d("div",null,[r,n(e,{path:"components/Modal"}),m,p,_])}const k=a(c,[["render",i]]);export{V as __pageData,k as default};
