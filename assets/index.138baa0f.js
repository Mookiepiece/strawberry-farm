import{r as t,a as c,j as e,P as o,B as a}from"./index.085f51cf.js";import{P as m}from"./PageWalker.10e4a88d.js";const f=()=>{const[p,i]=t.exports.useState(!1),[n,l]=t.exports.useState(!1),[u,s]=t.exports.useState(!1),r=t.exports.useRef();return c("div",{style:{display:"grid",gap:20,gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))"},children:[e(o,{popup:e("p",{children:"asdsd"}),popupClassName:"sf-popper--default",visible:p,onClose:()=>i(!1),children:e(a,{primary:!0,onFocus:()=>i(!0),onBlur:()=>i(!1),children:"onFocus"})}),e(o,{popup:e("p",{children:"asdsd asdsd asdsd asdsd"}),popupClassName:"sf-popper--default",visible:n,onClose:()=>l(!1),children:e(a,{primary:!0,onClick:()=>l(d=>!d),children:"onClick"})}),e(o,{popup:e("p",{onMouseEnter:()=>{r.current&&clearTimeout(r.current),s(!0)},onMouseLeave:()=>r.current=setTimeout(()=>s(!1),200),children:"asds dasd sdasdsd asdsd"}),popupClassName:"sf-popper--default",visible:u,onClose:()=>s(!1),closeOnClickOutside:!1,placement:"right",children:e(a,{primary:!0,onMouseEnter:()=>{r.current&&clearTimeout(r.current),s(!0)},onMouseLeave:()=>r.current=setTimeout(()=>s(!1),200),children:"onHover"})})]})};var b=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),v=`import React, { useState } from 'react';\r
import { useRef } from 'react';\r
import { Button, Popper } from '\u{1F984}';\r
\r
const BasicUsage: React.FC = () => {\r
  const [visible, setVisible] = useState(false);\r
  const [visible2, setVisible2] = useState(false);\r
  const [visible3, setVisible3] = useState(false);\r
\r
  const hideTimer = useRef<NodeJS.Timeout>();\r
\r
  return (\r
    <div\r
      style={{\r
        display: 'grid',\r
        gap: 20,\r
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',\r
      }}\r
    >\r
      <Popper\r
        popup={<p>asdsd</p>}\r
        popupClassName="sf-popper--default"\r
        visible={visible}\r
        onClose={() => setVisible(false)}\r
      >\r
        <Button primary onFocus={() => setVisible(true)} onBlur={() => setVisible(false)}>\r
          onFocus\r
        </Button>\r
      </Popper>\r
      <Popper\r
        popup={<p>asdsd asdsd asdsd asdsd</p>}\r
        popupClassName="sf-popper--default"\r
        visible={visible2}\r
        onClose={() => setVisible2(false)}\r
      >\r
        <Button primary onClick={() => setVisible2(v => !v)}>\r
          onClick\r
        </Button>\r
      </Popper>\r
      <Popper\r
        popup={\r
          <p\r
            onMouseEnter={() => {\r
              hideTimer.current && clearTimeout(hideTimer.current);\r
              setVisible3(true);\r
            }}\r
            onMouseLeave={() => (hideTimer.current = setTimeout(() => setVisible3(false), 200))}\r
          >\r
            asds dasd sdasdsd asdsd\r
          </p>\r
        }\r
        popupClassName="sf-popper--default"\r
        visible={visible3}\r
        onClose={() => setVisible3(false)}\r
        closeOnClickOutside={false}\r
        placement="right"\r
      >\r
        <Button\r
          primary\r
          onMouseEnter={() => {\r
            hideTimer.current && clearTimeout(hideTimer.current);\r
            setVisible3(true);\r
          }}\r
          onMouseLeave={() => (hideTimer.current = setTimeout(() => setVisible3(false), 200))}\r
        >\r
          onHover\r
        </Button>\r
      </Popper>\r
    </div>\r
  );\r
};\r
export default BasicUsage;\r
`,h=`## Popper \u5F39\u5C42\r
\r
Powered by \`@floating-ui/dom\`. \r
\r
:::demo{basic}\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
:::`,C=`## Popper\r
\r
Powered by \`@floating-ui/dom\`.\r
\r
:::demo{basic}\r
\r
### Basic\r
\r
:::\r
`;const T={"./basic.tsx":b},g={basic:v},P={zh:h,en:C},y=()=>e(m,{requireDemo:T,requireRaw:g,requireMd:P});export{y as default};
