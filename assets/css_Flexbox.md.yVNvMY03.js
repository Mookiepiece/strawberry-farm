import{I as o,m as r,o as a,h as c,B as e,J as t}from"./chunks/framework.q6r8hxCe.js";const y=JSON.parse('{"title":"Flexbox","description":"","frontmatter":{},"headers":[],"relativePath":"css/Flexbox.md","filePath":"css/Flexbox.md"}'),n={name:"css/Flexbox.md"},l=t('<h1 id="flexbox" tabindex="-1">Flexbox <a class="header-anchor" href="#flexbox" aria-label="Permalink to &quot;Flexbox&quot;">​</a></h1><p>注意：<code>Emmet</code> 不支持中括号</p><h2 id="flex-container" tabindex="-1">Flex Container <a class="header-anchor" href="#flex-container" aria-label="Permalink to &quot;Flex Container&quot;">​</a></h2><p>用一个类名同时定义多个属性，仅三个主要类名。</p><table><thead><tr><th>Method</th><th>Example</th><th>CSS</th></tr></thead><tbody><tr><td>Direction</td><td><code>[A]</code></td><td><code>display</code>, <code>flex-direction</code></td></tr><tr><td>Inline</td><td><code>[FS]</code></td><td><code>align-items</code>, <code>justify-content</code></td></tr><tr><td>Multiple lines</td><td><code>[[+S]]</code></td><td><code>align-content</code>, <code>flex-wrap</code></td></tr></tbody></table><p>在本页中，表格中加粗的一行代表 CSS 的缺省值。</p><h3 id="方向" tabindex="-1">方向 <a class="header-anchor" href="#方向" aria-label="Permalink to &quot;方向&quot;">​</a></h3><p>参考 XBOX 控制器的键位。</p><table><thead><tr><th></th><th style="text-align:center;"><code>flex</code></th><th></th><th></th><th></th><th style="text-align:center;"><code>inline-flex</code></th><th></th></tr></thead><tbody><tr><td></td><td style="text-align:center;">[Y]</td><td></td><td></td><td></td><td style="text-align:center;">[y]</td><td></td></tr><tr><td>[X]</td><td style="text-align:center;"></td><td><strong>[B]</strong></td><td></td><td>[x]</td><td style="text-align:center;"></td><td><strong>[b]</strong></td></tr><tr><td></td><td style="text-align:center;">[A]</td><td></td><td></td><td></td><td style="text-align:center;">[a]</td><td></td></tr></tbody></table>',9),s=t(`<h3 id="单行定位" tabindex="-1">单行定位 <a class="header-anchor" href="#单行定位" aria-label="Permalink to &quot;单行定位&quot;">​</a></h3><p>参考 place-items 语法，align 在前。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>place-items = </span></span>
<span class="line"><span>  &lt;&#39;align-items&#39;&gt; &lt;&#39;justify-items&#39;&gt;?</span></span></code></pre></div><p><code>align-items</code> 的有效值如下表：</p><table><thead><tr><th></th><th>CSS Value</th><th>Comment</th></tr></thead><tbody><tr><td>S</td><td>flex-start</td><td>Start</td></tr><tr><td>C</td><td>center</td><td>Center</td></tr><tr><td>E</td><td>flex-end</td><td>End</td></tr><tr><td><strong>F</strong></td><td><strong>stretch</strong></td><td><strong>Full</strong></td></tr><tr><td>B</td><td>baseline</td><td>Baseline</td></tr></tbody></table>`,5),h=t("<p><code>justify-content</code> 的有效值如下表：</p><table><thead><tr><th></th><th>CSS Value</th><th>Comment</th></tr></thead><tbody><tr><td><strong>S</strong></td><td><strong>flex-start</strong></td><td><strong>Start</strong></td></tr><tr><td>C</td><td>center</td><td>Center</td></tr><tr><td>E</td><td>flex-end</td><td>End</td></tr><tr><td>0</td><td>space-between</td><td>0/2 to edge</td></tr><tr><td>1</td><td>space-evenly</td><td>1/2 to edge</td></tr><tr><td>2</td><td>space-around</td><td>2/2 to edge</td></tr></tbody></table>",2),i=t('<h3 id="多行定位" tabindex="-1">多行定位 <a class="header-anchor" href="#多行定位" aria-label="Permalink to &quot;多行定位&quot;">​</a></h3><p><code>flex-wrap</code> 具有 <code>no-wrap</code> <code>wrap</code> <code>wrap-reverse</code> 三种情况，意味着我们需要支持反方向。</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><code>[[+S]]</code></td><td><code>flex-wrap: wrap</code></td></tr><tr><td><code>[[-S]]</code></td><td><code>flex-wrap: wrap-reverse</code></td></tr></tbody></table><p>若不启动此标志位，则默认不换行。</p><p><code>ailgn-content</code> 的有效值如下表：</p><table><thead><tr><th></th><th>CSS Value</th><th>Comment</th></tr></thead><tbody><tr><td>S</td><td>flex-start</td><td>Start</td></tr><tr><td>C</td><td>center</td><td>Center</td></tr><tr><td>E</td><td>flex-end</td><td>End</td></tr><tr><td>0</td><td>space-between</td><td>0/2 to edge</td></tr><tr><td>1</td><td>space-evenly</td><td>1/2 to edge</td></tr><tr><td>2</td><td>space-around</td><td>2/2 to edge</td></tr><tr><td><strong>F</strong></td><td><strong>stretch</strong></td><td><strong>Full</strong></td></tr></tbody></table>',6),_=t('<h2 id="flex-item" tabindex="-1">Flex Item <a class="header-anchor" href="#flex-item" aria-label="Permalink to &quot;Flex Item&quot;">​</a></h2><table><thead><tr><th>Class</th><th>CSS</th></tr></thead><tbody><tr><td><code>[+0]</code></td><td><code>flex-grow: 0</code></td></tr><tr><td><code>[+1]</code></td><td></td></tr><tr><td><code>[+2]</code></td><td></td></tr><tr><td><code>[+3]</code></td><td></td></tr><tr><td><code>[+4]</code></td><td></td></tr><tr><td><code>[+5]</code></td><td></td></tr><tr><td><code>[-0]</code></td><td><code>flex-shrink: 0</code></td></tr><tr><td><code>[-1]</code></td><td></td></tr><tr><td><code>[-2]</code></td><td></td></tr><tr><td><code>[-3]</code></td><td></td></tr><tr><td><code>[-4]</code></td><td></td></tr><tr><td><code>[-5]</code></td><td></td></tr></tbody></table>',2);function p(x,b,g,m,S,f){const d=r("VPDemo");return a(),c("div",null,[l,e(d,{path:"css/Flexbox1"}),s,e(d,{path:"css/Flexbox2"}),h,e(d,{path:"css/Flexbox3"}),i,e(d,{path:"css/Flexbox4"}),_])}const C=o(n,[["render",p]]);export{y as __pageData,C as default};
