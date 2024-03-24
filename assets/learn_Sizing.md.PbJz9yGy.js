import{I as t,o as i,h as s,J as a}from"./chunks/framework.q6r8hxCe.js";const g=JSON.parse('{"title":"Sizing","description":"","frontmatter":{},"headers":[],"relativePath":"learn/Sizing.md","filePath":"learn/Sizing.md"}'),e={name:"learn/Sizing.md"},n=a(`<h1 id="sizing" tabindex="-1">Sizing <a class="header-anchor" href="#sizing" aria-label="Permalink to &quot;Sizing&quot;">​</a></h1><p>本章节探讨在设计和应用 CSS 时经常会遇到尺寸和预期的想法不匹配的问题。</p><h3 id="button" tabindex="-1">Button <a class="header-anchor" href="#button" aria-label="Permalink to &quot;Button&quot;">​</a></h3><details class="details custom-block"><summary>HTML 的 <code>&lt;button /&gt;</code> 元素在具有 <code>display:block</code> 时其宽度并不延长，其原因是 <code>&lt;button /&gt;</code> 的默认宽度是 <code>width: fit-content</code></summary><p><a href="https://stackoverflow.com/questions/9699039/button-with-displayblock-not-stretched/60001153#60001153" target="_blank" rel="noreferrer">我在 Stackflow 的回答</a></p><p>同时 <code>&lt;button /&gt;</code> 若只包含文字，其文字默认垂直居中，也包含在了定义里。</p></details><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;display: block&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width: 100%&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p><button style="display:block;">1</button><button style="width:100%;">1</button></p><h3 id="input" tabindex="-1">Input <a class="header-anchor" href="#input" aria-label="Permalink to &quot;Input&quot;">​</a></h3><p>详见 Form 章节。</p>`,8),l=[n];function o(h,p,r,d,k,c){return i(),s("div",null,l)}const E=t(e,[["render",o]]);export{g as __pageData,E as default};
