var l=Object.defineProperty;var m=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var i=(e,t,r)=>m(e,typeof t!="symbol"?t+"":t,r);class b extends HTMLElement{connectedCallback(){this.draw()}attributeChangedCallback(t){t==="k"&&this.draw()}draw(){const t=(this.getAttribute("k")||"").trim().split("+").flatMap((s,a,n)=>a<n.length-1?[s,"+"]:s),r=s=>{const a=(o,d)=>{const c=document.createElement("kbd");return c.append(o),d&&(c.className=d),c},n=(o,d)=>{const c=document.createElement("i-feather");c.setAttribute("i",o);const u=document.createElement("kbd");return u.append(c),u};switch(s.toLowerCase()){case"up":return n("arrow-up");case"down":return n("arrow-down");case"left":return n("arrow-left");case"right":return n("arrow-right");case"m0":return a("","m0");case"m1":return a("","m1");case"m2":return a("","m2");case"+":return"+";default:return a(s)}};this.replaceChildren(...t.map(r))}}i(b,"observedAttributes",["k"]);export{b as VPKbdElement};
