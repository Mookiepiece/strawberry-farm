import{J as a,p as i,o as t,i as r,C as e,K as d}from"./chunks/framework.IkYOgTiJ.js";const G=JSON.parse('{"title":"RadioGroup","description":"","frontmatter":{},"headers":[],"relativePath":"design/RadioGroup.md","filePath":"design/RadioGroup.md"}'),s={name:"design/RadioGroup.md"},n=d('<h1 id="radiogroup" tabindex="-1">RadioGroup <a class="header-anchor" href="#radiogroup" aria-label="Permalink to &quot;RadioGroup&quot;">​</a></h1><h1 id="spec" tabindex="-1">Spec <a class="header-anchor" href="#spec" aria-label="Permalink to &quot;Spec&quot;">​</a></h1><ul><li>使用 <code>[role=&quot;listbox&quot;]</code> 实现，因为 <code>radio</code> 的 tabindex 向下代理难以管理。</li><li>聚焦时 （包括点击导致的）如果发现没匹配的选项值，会洗出第一个游标。</li><li>单选模式下且不设置可清空则游标的移动会导致自动改值，多选或可清空则只移动游标，不会改变值。</li><li>方向键移动游标，多选模式按空格或回车以选择。</li></ul>',3);function c(p,l,_,u,h,m){const o=i("VPDemo");return t(),r("div",null,[n,e(o,{path:"design/RadioGroup"}),e(o,{path:"design/RadioGroupCheckboxGroup"})])}const R=a(s,[["render",c]]);export{G as __pageData,R as default};
