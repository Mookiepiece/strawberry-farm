import{B as r}from"./Box.539d8b87.js";import{j as a,F as e,a as o}from"./index.7584e1e9.js";import{P as u}from"./PageWalker.e8fa03b5.js";const n=()=>a(e,{children:[o("style",{children:`
    .\u{1F383}\u{1F38A}\u{1F9E7}{
      height: 110px;
      background: var(--color-contrasting-fade-100);
      color: white;
    }
    .\u{1F383}\u{1F38A}\u{1F9E7} div {
      background: var(--color-contrasting-fade-200);
      border-radius: 3px;
      padding: 2px 5px;
    }
    `}),a(r,{grid:!0,gap:10,children:[a(r,{horizontal:!0,className:"\u{1F383}\u{1F38A}\u{1F9E7} p-10",gap:10,justify:"evenly",align:"center",children:[o(r,{grow:1,children:"1"}),o(r,{basis:100,children:"2"}),o(r,{children:"3"})]}),a(r,{horizontal:!0,className:"\u{1F383}\u{1F38A}\u{1F9E7} p-10",gap:10,justify:"center",align:"center",children:[o(r,{grow:0,children:"1\xA0"}),o(r,{grow:0,children:"2\xA0"}),o(r,{grow:0,className:"ml-auto",children:"3\xA0"})]}),a(r,{horizontal:!0,className:"\u{1F383}\u{1F38A}\u{1F9E7} p-10",gap:10,align:"center",wrap:!0,children:[o(r,{grow:2,children:"1"}),o(r,{children:"2"}),o(r,{grow:1,children:"3"})]})]})]});var F=Object.freeze(Object.defineProperty({__proto__:null,default:n},Symbol.toStringTag,{value:"Module"}));const s=()=>a(e,{children:[o("style",{children:`
    .\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}{
      width: 100px;
      height: 100px;
      box-sizing: border-box;
      background: var(--color-dark-fade-100);
      color:  var(--color-dark);
    }
    .\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} div {
      color: white;
      height: 50px;
      background: var(--color-dark-fade-200);
      border-radius: 3px;
      padding: 2px 5px;
    }

    `}),a(r,{style:{display:"grid",gap:5,gridTemplateColumns:"repeat(auto-fit, 100px)"},children:[o(r,{className:"\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}",children:o(r,{children:"default"})}),o(r,{className:"\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} pr-10",children:o(r,{children:"pr-10"})}),o(r,{className:"\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} px-10",children:o(r,{children:"px-10"})}),o(r,{className:"\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} pt-10",children:o(r,{children:"pt-10"})}),o(r,{className:"\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} py-10",children:o(r,{children:"py-10"})}),a(r,{className:"\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}",children:[o(r,{className:"mr-10"})," mr-10"]}),a(r,{className:"\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}",children:[o(r,{className:"mx-10"})," mr-10"]}),a(r,{className:"\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}",children:[o(r,{className:"mx-auto",style:{width:30}})," mx-auto"]})]})]});var l=Object.freeze(Object.defineProperty({__proto__:null,default:s},Symbol.toStringTag,{value:"Module"})),i=`import React from 'react';\r
import { Box } from '\u{1F984}';\r
\r
const BasicUsage: React.FC = () => {\r
  return (\r
    <>\r
      <style>{\`\r
    .\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}{\r
      width: 100px;\r
      height: 100px;\r
      box-sizing: border-box;\r
      background: var(--color-dark-fade-100);\r
      color:  var(--color-dark);\r
    }\r
    .\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} div {\r
      color: white;\r
      height: 50px;\r
      background: var(--color-dark-fade-200);\r
      border-radius: 3px;\r
      padding: 2px 5px;\r
    }\r
\r
    \`}</style>\r
      <Box\r
        style={{\r
          display: 'grid',\r
          gap: 5,\r
          gridTemplateColumns: 'repeat(auto-fit, 100px)',\r
        }}\r
      >\r
        <Box className="\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}">\r
          <Box>default</Box>\r
        </Box>\r
        <Box className="\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} pr-10">\r
          <Box>pr-10</Box>\r
        </Box>\r
        <Box className="\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} px-10">\r
          <Box>px-10</Box>\r
        </Box>\r
        <Box className="\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} pt-10">\r
          <Box>pt-10</Box>\r
        </Box>\r
        <Box className="\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5} py-10">\r
          <Box>py-10</Box>\r
        </Box>\r
        <Box className="\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}">\r
          <Box className="mr-10"></Box> mr-10\r
        </Box>\r
        <Box className="\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}">\r
          <Box className="mx-10"></Box> mr-10\r
        </Box>\r
        <Box className="\u{1F383}\u{1F38A}\u{1F9E7}\u{1F9F5}">\r
          <Box className="mx-auto" style={{ width: 30 }}></Box> mx-auto\r
        </Box>\r
      </Box>\r
    </>\r
  );\r
};\r
export default BasicUsage;\r
`,c=`import React from 'react';\r
import { Box } from '\u{1F984}';\r
\r
const BasicUsage: React.FC = () => {\r
  return (\r
    <>\r
      <style>{\`\r
    .\u{1F383}\u{1F38A}\u{1F9E7}{\r
      height: 110px;\r
      background: var(--color-contrasting-fade-100);\r
      color: white;\r
    }\r
    .\u{1F383}\u{1F38A}\u{1F9E7} div {\r
      background: var(--color-contrasting-fade-200);\r
      border-radius: 3px;\r
      padding: 2px 5px;\r
    }\r
    \`}</style>\r
      <Box grid gap={10}>\r
        <Box horizontal className="\u{1F383}\u{1F38A}\u{1F9E7} p-10" gap={10} justify="evenly" align="center">\r
          <Box grow={1}>1</Box>\r
          <Box basis={100}>2</Box>\r
          <Box>3</Box>\r
        </Box>\r
        <Box horizontal className="\u{1F383}\u{1F38A}\u{1F9E7} p-10" gap={10} justify="center" align="center">\r
          <Box grow={0}>1&nbsp;</Box>\r
          <Box grow={0}>2&nbsp;</Box>\r
          <Box grow={0} className="ml-auto">3&nbsp;</Box>\r
        </Box>\r
        <Box horizontal className="\u{1F383}\u{1F38A}\u{1F9E7} p-10" gap={10} align="center" wrap>\r
          <Box grow={2}>1</Box>\r
          <Box>2</Box>\r
          <Box grow={1}>3</Box>\r
        </Box>\r
      </Box>\r
    </>\r
  );\r
};\r
export default BasicUsage;\r
`,t=`## Box \u6CE2\u514B\u65AF\r
\r
:::demo{spacing}\r
\r
### \u7A7A\u767D\r
\r
\u6709 \`2\`,\`5\`,\`10\`,\`20\`,\`30\`,\`50\` \u8FD9\u51E0\u6837\u8FB9\u8DDD\u3002\r
\r
:::\r
\r
:::demo{grid}\r
\r
### \u6805\u683C\r
\r
\u4F7F\u7528\`Box\`\u5E03\u5C40\u3002\r
\r
\u652F\u6301\`flexbox\`\u548C\`grid\`\u3002\r
\r
:::\r
\r
### DOM\r
\r
\`div\`\r
`,x=`## Box\r
\r
:::demo{spacing}\r
\r
### Spacing\r
\r
\`2\`,\`5\`,\`10\`,\`20\`,\`30\`,\`50\` is available spacing.\r
\r
:::\r
\r
:::demo{grid}\r
\r
### Grid\r
\r
Use \`Box\` to layout\u3002\r
\r
\`flexbox\` and \`grid\` is supported.\r
\r
:::\r
\r
### DOM\r
\r
\`div\`\r
`;const d={"./grid.tsx":F,"./spacing.tsx":l},p={spacing:i,grid:c},g={zh:t,en:x},b=()=>o(u,{requireDemo:d,requireRaw:p,requireMd:g});export{b as default};
