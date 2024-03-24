import{I as t,o as e,h as d,J as a}from"./chunks/framework.q6r8hxCe.js";const u=JSON.parse('{"title":"交互 Interaction","description":"","frontmatter":{},"headers":[],"relativePath":"design/Interaction.md","filePath":"design/Interaction.md"}'),o={name:"design/Interaction.md"},n=a('<h1 id="交互-interaction" tabindex="-1">交互 Interaction <a class="header-anchor" href="#交互-interaction" aria-label="Permalink to &quot;交互 Interaction&quot;">​</a></h1><h2 id="z-index" tabindex="-1">z-index <a class="header-anchor" href="#z-index" aria-label="Permalink to &quot;z-index&quot;">​</a></h2><table><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td>landmarks</td><td><code>z-index: 1</code></td><td>使主要元素在出场动画时能正确叠加在正文上（依赖具体实现可能不需要）</td></tr><tr><td>:focus</td><td><code>z-index: 1</code></td><td>边框叠加的情况下使元素的边框和阴影能叠加在周围的元素上</td></tr><tr><td>Modal</td><td><code>z-index: 2</code></td><td>模态框具有更高的优先级</td></tr><tr><td>Toast</td><td><code>z-index: 3</code></td><td>吐司具有更高的优先级</td></tr></tbody></table><h2 id="焰波-bloom" tabindex="-1">焰波 Bloom <a class="header-anchor" href="#焰波-bloom" aria-label="Permalink to &quot;焰波 Bloom&quot;">​</a></h2><p>模拟光晕特效，用于提示被聚焦元素变为可交互状态，等待进一步的输入：</p><ul><li>任何元素的 <code>focus-visible</code> 状态（输入框等）</li><li>选择器被激活</li></ul><p>可交互元素本身具有实色边框时，焰波的范围将扩大。</p><p>当可交互元素进一步聚焦时，焰波的范围将扩大：</p><ul><li>滑块正在被拖动</li></ul>',9),i=[n];function r(c,l,s,h,_,m){return e(),d("div",null,i)}const x=t(o,[["render",r]]);export{u as __pageData,x as default};
