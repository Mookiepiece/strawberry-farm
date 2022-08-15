import{r as i,M as f,a as n,F as c,j as t,B as a,b as l}from"./index.e42e054f.js";import{P as m}from"./PageWalker.8f5b2b25.js";const d=[..."\u{1F34E}\u{1F34F}\u{1F96D}\u{1F353}\u{1F352}\u{1F350}\u{1F351}\u{1F34C}\u{1F34B}"],p=()=>{const e=i.exports.useMemo(()=>{const o=f();return o.on("ALERT",u=>{alert(u.a)}),o},[]),[r,s]=i.exports.useState("\u{1F34E}");return i.exports.useEffect(()=>e.on("GACHA",()=>s(d.filter(o=>o!==r)[Math.floor(Math.random()*7.9)])),[r,e]),n(c,{children:[t(a,{onClick:()=>e.emit("GACHA"),children:"GACHA"}),t(a,{onClick:()=>e.emit("ALERT",{a:r}),children:"Alert"}),t("style",{children:`
      @keyframes demo{
        from{
          border: solid 50px pink;
          background: white;
          transform: scale(.6);
        } to {
          border: solid 0px white;
          background: transparent;
          transform: scale(1);
        }
      }`}),n(l,{className:"my-50",align:"center",style:{position:"relative",width:100,height:100,fontSize:60,textAlign:"center",border:"1px dashed var(--color-dark-fade-100)"},children:[r,t("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,borderRadius:999,animation:"demo 1s forwards 1 var(--bezier-ea)"}})]},r)]})};var b=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"})),F=`import React, { useEffect, useMemo, useState } from 'react';\r
import { Box, Button } from '\u{1F984}';\r
import { Mitt } from '\u{1F984}/shared';\r
\r
const fruits = [...'\u{1F34E}\u{1F34F}\u{1F96D}\u{1F353}\u{1F352}\u{1F350}\u{1F351}\u{1F34C}\u{1F34B}'];\r
\r
const Demo: React.FC = () => {\r
  const fooMitt = useMemo(() => {\r
    const fooMitt = Mitt<{\r
      GACHA: void;\r
      ALERT: { a: string };\r
    }>();\r
\r
    fooMitt.on('ALERT', event => {\r
      alert(event.a);\r
    });\r
\r
    return fooMitt;\r
  }, []);\r
\r
  const [fruit, setFruit] = useState('\u{1F34E}');\r
  useEffect(() => {\r
    return fooMitt.on('GACHA', () =>\r
      setFruit(fruits.filter(i => i !== fruit)[Math.floor(Math.random() * 7.9)])\r
    );\r
  }, [fruit, fooMitt]);\r
\r
  return (\r
    <>\r
      <Button onClick={() => fooMitt.emit('GACHA')}>GACHA</Button>\r
      <Button onClick={() => fooMitt.emit('ALERT', { a: fruit })}>Alert</Button>\r
\r
      <style>{\`\r
      @keyframes demo{\r
        from{\r
          border: solid 50px pink;\r
          background: white;\r
          transform: scale(.6);\r
        } to {\r
          border: solid 0px white;\r
          background: transparent;\r
          transform: scale(1);\r
        }\r
      }\`}</style>\r
      <Box\r
        key={fruit}\r
        className="my-50"\r
        align="center"\r
        style={{\r
          position: 'relative',\r
          width: 100,\r
          height: 100,\r
          fontSize: 60,\r
          textAlign: 'center',\r
          border: '1px dashed var(--color-dark-fade-100)',\r
        }}\r
      >\r
        {fruit}\r
        <div\r
          style={{\r
            position: 'absolute',\r
            left: 0,\r
            right: 0,\r
            top: 0,\r
            bottom: 0,\r
            borderRadius: 999,\r
            animation: 'demo 1s forwards 1 var(--bezier-ea)',\r
          }}\r
        ></div>\r
      </Box>\r
    </>\r
  );\r
};\r
\r
export default Demo;\r
`,h=`## Mitt\r
\r
[mitt](https://www.npmjs.com/package/mitt) \u662F\u4E00\u4E2A\u5C0F\u578B\u53D1\u5E03\u8BA2\u9605\u5668\uFF0C\`strawberry-farm\` \u4E3A\u5176\u6DFB\u52A0\u4EE5\u4E0B\u529F\u80FD\u3002\r
\r
- \u91CD\u65B0\u5B9A\u4E49 \`typescript\`\uFF0C\u533A\u5206\u6BCF\u4E2A\u4E8B\u4EF6\u7C7B\u578B\u3002\r
- \`on\` \u51FD\u6570\u73B0\u5728\u8FD4\u56DE \`off\`\u3002\r
\r
### Basic\r
\r
::demo{basic}\r
`,M=`## Mitt\r
\r
[mitt](https://www.npmjs.com/package/mitt) is a tiny pub/sub library\uFF0C\`strawberry-farm\` and following functionality for it:\r
\r
- Redeclare \`typescript\`, each event type now has its own parameters.\r
- \`on\` retuns a kind of \`off\` function\u3002\r
\r
### Basic\r
\r
::demo{basic}\r
`;const A={"./basic.tsx":b},g={basic:F},y={zh:h,en:M},k=()=>t(m,{requireDemo:A,requireRaw:g,requireMd:y});export{k as default};
