import{I as l,q as o,j as p,J as e,p as t,H as s,D as n,o as d}from"./chunks/framework.qiMOmzvi.js";const b=JSON.parse('{"title":"Popover","description":"","frontmatter":{},"headers":[],"relativePath":"components/Popover.md","filePath":"components/Popover.md"}'),r={name:"components/Popover.md"};function h(k,a,c,u,E,m){const i=o("VPDemo");return d(),p("div",null,[a[0]||(a[0]=e(`<h1 id="popover" tabindex="-1">Popover <a class="header-anchor" href="#popover" aria-label="Permalink to &quot;Popover&quot;">​</a></h1><p>An opinionated way to use <code>levitate</code>.</p><h3 id="dom" tabindex="-1">DOM <a class="header-anchor" href="#dom" aria-label="Permalink to &quot;DOM&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> data-pop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">slot</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;popper&quot;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="command-list" tabindex="-1">Command List <a class="header-anchor" href="#command-list" aria-label="Permalink to &quot;Command List&quot;">​</a></h3>`,5)),a[1]||(a[1]=t("table",{tabindex:"0"},[t("thead",null,[t("tr",null,[t("th",null,"Command List"),t("th")])]),t("tbody",null,[t("tr",null,[t("td",null,[t("vp-kbd",{k:"up"}),s(" / "),t("vp-kbd",{k:"left"}),s(" / "),t("vp-kbd",{k:"down"}),s(" / "),t("vp-kbd",{k:"right"}),s(" / "),t("vp-kbd",{k:"Space"})]),t("td",null,"Open.")]),t("tr",null,[t("td",null,[t("vp-kbd",{k:"Esc"})]),t("td",null,"Close.")])])],-1)),a[2]||(a[2]=e('<h2 id="basics" tabindex="-1">Basics <a class="header-anchor" href="#basics" aria-label="Permalink to &quot;Basics&quot;">​</a></h2><p><code>&lt;slot name=&quot;default&quot; /&gt;</code> is used:</p><table tabindex="0"><thead><tr><th>Trigger</th><th>DOM Event Listener</th></tr></thead><tbody><tr><td>click</td><td>anc.click</td></tr><tr><td>hover</td><td>anc.pointerenter, anc.pointerout, pop.pointerenter, pop.pointerout</td></tr></tbody></table>',3)),n(i,{path:"components/Popover"}),a[3]||(a[3]=t("h2",{id:"chain",tabindex:"-1"},[s("Chain "),t("a",{class:"header-anchor",href:"#chain","aria-label":'Permalink to "Chain"'},"​")],-1)),a[4]||(a[4]=t("p",null,[s("Based on internal "),t("code",null,"popoverChain"),s(" levitate plugin, "),t("code",null,"trap"),s(" (Focus are trapped inside the popper) and "),t("code",null,"onClickAway"),s(" (Click outside to close) are aware of submenus.")],-1)),a[5]||(a[5]=t("p",null,"FIXME: hover out.",-1)),n(i,{path:"components/PopoverChain"})])}const v=l(r,[["render",h]]);export{b as __pageData,v as default};
