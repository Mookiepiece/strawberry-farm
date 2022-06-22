var v=Object.defineProperty,y=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var F=(a,n,e)=>n in a?v(a,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[n]=e,c=(a,n)=>{for(var e in n||(n={}))S.call(n,e)&&F(a,e,n[e]);if(b)for(var e of b(n))k.call(n,e)&&F(a,e,n[e]);return a},f=(a,n)=>y(a,I(n));import{h as t,a as s,F as l,j as r,I as m,B as h,r as d,C as w,k as H}from"./index.3f4b3495.js";import{P as x}from"./PageWalker.5ae00577.js";const V=()=>{const a=t.useForm({initialValue:{name:"12",hair:""},action:async e=>new Promise(i=>{setTimeout(()=>{alert(`submit${JSON.stringify(e)}`),i()},2e3)})}),n=t.defineRules({name:[{required:!0},{type:"string",min:5}],hair:[{type:"string",min:5,message:"User hair must longer than 5"},{required:!0,message:"hair is rrrrrrequired"}],hairPlus:[{type:"string",asyncValidator:e=>new Promise((i,o)=>{setTimeout(()=>{e.length<10?o("too short"):i()},2e3)})}]});return s(l,{children:[r("div",{style:{maxWidth:300},children:s(t,{form:a,children:[r(t.Item,{label:"User Name",name:"name",rules:n.name,children:r(m,{})}),r(t.Item,{label:"User Hair",name:"hair",rules:n.hair,children:r(m,{})}),r(t.Item,{label:"User Hair Plus",name:"hair",rules:n.hair,children:r(m,{})}),s("div",{children:[r(t.SubmitButton,{primary:!0,children:"\u63D0\u4EA4 Submit"}),"\xA0",r(h,{type:"reset",children:"\u91CD\u7F6E Reset"})]})]})}),r("br",{}),r("br",{})]})};var U=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));const _=()=>{const a=t.useForm({initialValue:{user:{name:"",hair:"",hair2:""},computed:{hairFieldVisible:!1}},FormWatcher:function({form:i,formValue:o}){return d.exports.useEffect(()=>{const u=!!o.user.name;u!==o.computed.hairFieldVisible&&i.setFieldSilently("computed.hairFieldVisible",u)},[i,o.computed.hairFieldVisible,o.user.name]),d.exports.useEffect(()=>{i.value.user.hair&&i.set(u=>f(c({},u),{user:f(c({},u.user),{hair:""})}))},[i,o.computed.hairFieldVisible]),null},action:async e=>alert("\u{1F389}"+JSON.stringify(e,null,4))}),{project:n}=t;return r(l,{children:s(t,{form:a,children:[r(t.Item,{name:"user",children:({value:e})=>s("p",{children:["I got ",e.name," and ",e.hair]})}),r(t.Item,{label:"User Name",name:"user.name",children:r(m,{})}),n("computed.hairFieldVisible",e=>e?r(t.Item,{label:"User Hair",name:"user.hair",children:r(m,{})}):null),n(["user.name","user.hair"],([e,i])=>e.length&&i.length?r(t.Item,{label:"User Hair II",name:"user.hair2",children:r(m,{})}):null),r(t.SubmitButton,{children:"\u63D0\u4EA4 Submit"})]})})};var B=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));const q=()=>{const a=t.useForm({initialValue:{name:"",hair:["",""],totalHairLength:Math.PI},FormWatcher:d.exports.useMemo(()=>function({form:i,formValue:o}){const u=o.hair.reduce((p,g)=>p+g.length,0);return d.exports.useEffect(()=>{i.setField("totalHairLength",u)},[i,u]),null},[]),action:async e=>alert("\u{1F389}"+JSON.stringify(e,null,4))}),n=t.defineRules({totalHairLength:{type:"number",min:10},hairItem:{type:"string",validator:e=>{if(console.log(e),e.length<5)return"too short"}}});return r(l,{children:s(t,{form:a,children:[r(t.Item,{label:"User Name",name:"name",rules:{required:!0},children:r(m,{})}),r(t.List,{name:"hair",children:(e,{add:i,remove:o})=>s(l,{children:[e.map((u,p)=>s("div",{children:[r(t.Item,{label:`User Hair ${u}`,name:`hair.${p}`,rules:n.hairItem,children:r(m,{})}),r(h,{onClick:()=>o(p),children:"Remove"}),r("br",{}),r("br",{})]},u)),e.length<4?r(h,{onClick:()=>i(""),children:"Add"}):null,"\xA0",e.length<10?r(h,{onClick:()=>i("www",0),children:"Add From Start"}):null]})}),r(t.Item,{name:"totalHairLength",rules:n.totalHairLength,children:({value:e})=>s("span",{children:["total: ",e]})}),r(t.SubmitButton,{children:"\u63D0\u4EA4 Submit"}),r("br",{}),r("br",{}),r(h,{onClick:()=>a.set(e=>f(c({},e),{hair:["asd","asdddd"]})),children:"Set list value using form instance method"})]})})};var E=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));const R=()=>{const a=t.useForm({initialValue:{name:"12",name2:"12",hair:""},action:async e=>new Promise(i=>{setTimeout(()=>{alert(`submit${JSON.stringify(e)}`),i()},500)})}),n=t.defineRules({name:[{required:!0},{type:"string",min:5,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni error, quibusdam exercitationem, quidem reprehenderit molestiae dolorem sint consequatur pariatur earum labore natus quis repellendus laudantium fuga accusamus corrupti sapiente incidunt!"}],hair:[{type:"string",min:5,message:"User hair must longer than 5"},{required:!0,message:"hair is rrrrrrequired"}]});return s(l,{children:[r("div",{style:{maxWidth:300},children:s(t,{form:a,children:[r(t.Item,{label:"User Name",name:"name",rules:n.name,children:r(m,{})}),r(t.Item,{label:"User Name",name:"name2",rules:n.name,children:(e,i)=>(i.alert,r(m,c({},e)))}),r(t.Item,{label:"User Hair",name:"hair",rules:n.hair,children:(e,{error:i,alert:o})=>s("div",{children:[r(m,c({},e)),o(i&&s("div",{style:{margin:"12px 0"},children:[r("span",{style:{fontSize:25},children:"\u{1F353}"}),r("br",{}),r("span",{children:"message\u5C31\u662F\u7528\u666E\u901A\u7684Collapse\u5B9E\u73B0\u7684"})]})),r(w,{children:i==="hair is rrrrrrequired"&&r("div",{children:r("span",{children:"\u6BD4\u5982\u8FD9\u4E2A"})})})]})}),r(t.SubmitButton,{primary:!0,children:"\u63D0\u4EA4 Submit"})]})}),r("br",{}),r("br",{})]})};var D=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"}));const C=()=>{const a=t.useForm({initialValue:{hair:"",checkHair:"",hair2:"",checkHair2:""},FormWatcher:d.exports.useMemo(()=>function({form:i,formValue:o}){const{hair:u}=o;return H(()=>{i.validate(["checkHair"])},[u]),null},[]),action:async e=>{alert(`\u{1F389}${JSON.stringify(e,null,4)}`)}}),n=t.defineRules({checkHair:[{validator:e=>{if(a.value.hair!==e)return"value must equal"}},{required:!0,whitespace:!0}],checkHair2:[{validator:e=>{if(a.value.hair2!==e)return"value must equal"}},{required:!0,whitespace:!0}],userHair:{validator(e){a.validate(["checkHair2"])}}});return r(l,{children:r("div",{style:{maxWidth:300},children:s(t,{form:a,children:[r(t.Item,{label:"User Hair",name:"hair",children:r(m,{})}),r(t.Item,{label:"Repeat User Hair",name:"checkHair",rules:n.checkHair,children:r(m,{})}),r(t.Item,{label:"User Hair II",name:"hair2",rules:n.userHair,children:r(m,{})}),r(t.Item,{label:"Repeat User Hair II",name:"checkHair2",rules:n.checkHair2,children:r(m,{})}),s("div",{children:[r(t.SubmitButton,{primary:!0,children:"\u63D0\u4EA4 Submit"}),"\xA0",r(h,{type:"reset",children:"\u91CD\u7F6E Reset"})]})]})})})};var N=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"}));const T=a=>new Promise((n,e)=>{setTimeout(()=>{/^\d/.test(a)?e({code:666,message:"username cannot starts with number 1234567890"}):a==="hack"&&e({code:555,message:"server error"}),n(0)},2e3)}),A=()=>{const[a,n]=d.exports.useState([{required:!0}]),e=t.useForm({initialValue:{name:""},action:[async i=>T(i.name).then(()=>{alert("\u{1F389} "+i.name)}).catch(async o=>{o.code===666&&o.message?(e.setError("name",o.message),n([{required:!0},{validator(u){if(u===i.name)return"The server don^t like this name, please pick another"}}])):alert("\u{1F4A2} server error")}),i=>{alert("\u{1F4A2}"+JSON.stringify(i,null,4))}]});return r(l,{children:s(t,{form:e,children:[r(t.Item,{label:"User Name",name:"name",rules:a,children:r(m,{})}),r(t.SubmitButton,{children:"\u63D0\u4EA4 Submit"})]})})};var L=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"})),j=`import React from 'react';\r
import { Form, Button, Input } from '\u{1F984}';\r
\r
type FormValue = {\r
  name: string;\r
  hair: string;\r
};\r
\r
const Demo: React.FC = () => {\r
  const form = Form.useForm<FormValue>({\r
    initialValue: {\r
      name: '12',\r
      hair: '',\r
    },\r
    action: async value =>\r
      new Promise(resolve => {\r
        setTimeout(() => {\r
          alert(\`submit\${JSON.stringify(value)}\`);\r
          resolve();\r
        }, 2000);\r
      }),\r
  });\r
\r
  const rules = Form.defineRules({\r
    name: [\r
      { required: true },\r
      {\r
        type: 'string',\r
        min: 5,\r
      },\r
    ],\r
    hair: [\r
      { type: 'string', min: 5, message: 'User hair must longer than 5' },\r
      { required: true, message: 'hair is rrrrrrequired' },\r
    ],\r
    hairPlus: [\r
      {\r
        type: 'string',\r
        asyncValidator: value => {\r
          return new Promise((resolve, reject) => {\r
            setTimeout(() => {\r
              if (value.length < 10) {\r
                reject('too short');\r
              } else {\r
                resolve();\r
              }\r
            }, 2000);\r
          });\r
        },\r
      },\r
    ],\r
  });\r
\r
  return (\r
    <>\r
      <div style={{ maxWidth: 300 }}>\r
        <Form<{\r
          name: string;\r
          hair: string;\r
        }>\r
          form={form}\r
        >\r
          <Form.Item label="User Name" name="name" rules={rules.name}>\r
            <Input />\r
          </Form.Item>\r
          <Form.Item label="User Hair" name="hair" rules={rules.hair}>\r
            <Input />\r
          </Form.Item>\r
          <Form.Item label="User Hair Plus" name="hair" rules={rules.hair}>\r
            <Input />\r
          </Form.Item>\r
          <div>\r
            <Form.SubmitButton primary>\u63D0\u4EA4 Submit</Form.SubmitButton>\r
            &nbsp;\r
            <Button type="reset">\u91CD\u7F6E Reset</Button>\r
          </div>\r
        </Form>\r
      </div>\r
      <br />\r
      <br />\r
    </>\r
  );\r
};\r
export default Demo;\r
`,P=`import React, { useEffect, useMemo } from 'react';\r
import { Form, Input } from '\u{1F984}';\r
\r
type FormValue = {\r
  user: {\r
    name: string;\r
    hair: string;\r
    hair2: string;\r
  };\r
  computed: {\r
    hairFieldVisible: boolean;\r
  };\r
};\r
\r
const Demo: React.FC = () => {\r
  const form = Form.useForm<FormValue>({\r
    initialValue: {\r
      user: {\r
        name: '',\r
        hair: '',\r
        hair2: '',\r
      },\r
      computed: {\r
        hairFieldVisible: false,\r
      },\r
    },\r
    FormWatcher: function FormWatcher({ form, formValue }) {\r
      useEffect(() => {\r
        const hairFieldVisible = !!formValue.user.name;\r
        if (hairFieldVisible !== formValue.computed.hairFieldVisible) {\r
          form.setFieldSilently('computed.hairFieldVisible', hairFieldVisible);\r
        }\r
      }, [form, formValue.computed.hairFieldVisible, formValue.user.name]);\r
\r
      useEffect(() => {\r
        form.value.user.hair && form.set(v => ({ ...v, user: { ...v.user, hair: '' } }));\r
      }, [form, formValue.computed.hairFieldVisible]);\r
\r
      return null;\r
    },\r
    action: async v => alert('\u{1F389}' + JSON.stringify(v, null, 4)),\r
  });\r
\r
  const { project } = Form;\r
\r
  return (\r
    <>\r
      <Form form={form}>\r
        <Form.Item name="user">\r
          {({ value: user }) => {\r
            return (\r
              <p>\r
                I got {user.name} and {user.hair}\r
              </p>\r
            );\r
          }}\r
        </Form.Item>\r
\r
        <Form.Item label="User Name" name="user.name">\r
          <Input />\r
        </Form.Item>\r
\r
        {project('computed.hairFieldVisible', visible =>\r
          visible ? (\r
            <Form.Item label="User Hair" name="user.hair">\r
              <Input />\r
            </Form.Item>\r
          ) : null\r
        )}\r
\r
        {project(['user.name', 'user.hair'], ([name, hair]: [string, string]) =>\r
          name.length && hair.length ? (\r
            <Form.Item label="User Hair II" name="user.hair2">\r
              <Input />\r
            </Form.Item>\r
          ) : null\r
        )}\r
\r
        <Form.SubmitButton>\u63D0\u4EA4 Submit</Form.SubmitButton>\r
      </Form>\r
    </>\r
  );\r
};\r
export default Demo;\r
`,W=`import React, { useMemo } from 'react';\r
import { useUpdateEffect } from 'react-use';\r
import { Form, Button, Input } from '\u{1F984}';\r
\r
type FormValue = {\r
  hair: string;\r
  checkHair: string;\r
  hair2: string;\r
  checkHair2: string;\r
};\r
\r
const Demo: React.FC = () => {\r
  const form = Form.useForm<FormValue>({\r
    initialValue: {\r
      hair: '',\r
      checkHair: '',\r
      hair2: '',\r
      checkHair2: '',\r
    },\r
    FormWatcher: useMemo(\r
      () =>\r
        function FormWatcher({ form, formValue }) {\r
          const { hair } = formValue;\r
          useUpdateEffect(() => {\r
            form.validate(['checkHair']);\r
          }, [hair]);\r
          return null;\r
        },\r
      []\r
    ),\r
    action: async value => {\r
      alert(\`\u{1F389}\${JSON.stringify(value, null, 4)}\`);\r
    },\r
  });\r
\r
  const rules = Form.defineRules({\r
    checkHair: [\r
      {\r
        validator: value => {\r
          if (form.value.hair !== value) {\r
            return 'value must equal';\r
          }\r
        },\r
      },\r
      {\r
        required: true,\r
        whitespace: true,\r
      },\r
    ],\r
    checkHair2: [\r
      {\r
        validator: value => {\r
          if (form.value.hair2 !== value) {\r
            return 'value must equal';\r
          }\r
        },\r
      },\r
      {\r
        required: true,\r
        whitespace: true,\r
      },\r
    ],\r
    userHair: {\r
      validator(value) {\r
        form.validate(['checkHair2']);\r
      },\r
    },\r
  });\r
\r
  return (\r
    <>\r
      <div style={{ maxWidth: 300 }}>\r
        <Form form={form}>\r
          <Form.Item label="User Hair" name="hair">\r
            <Input />\r
          </Form.Item>\r
          <Form.Item label="Repeat User Hair" name="checkHair" rules={rules.checkHair}>\r
            <Input />\r
          </Form.Item>\r
          <Form.Item label="User Hair II" name="hair2" rules={rules.userHair}>\r
            <Input />\r
          </Form.Item>\r
          <Form.Item label="Repeat User Hair II" name="checkHair2" rules={rules.checkHair2}>\r
            <Input />\r
          </Form.Item>\r
          <div>\r
            <Form.SubmitButton primary>\u63D0\u4EA4 Submit</Form.SubmitButton>\r
            &nbsp;\r
            <Button type="reset">\u91CD\u7F6E Reset</Button>\r
          </div>\r
        </Form>\r
      </div>\r
    </>\r
  );\r
};\r
\r
export default Demo;\r
`,O=`import React, { useMemo, useEffect } from 'react';\r
import { Button, Form, Input } from '\u{1F984}';\r
\r
type FormValue = {\r
  name: string;\r
  hair: string[];\r
\r
  /**\r
   * @computed\r
   */\r
  totalHairLength: number;\r
};\r
\r
const Demo: React.FC = () => {\r
  const form = Form.useForm<FormValue>({\r
    initialValue: {\r
      name: '',\r
      hair: ['', ''],\r
      // computed property will recalculate in every render.\r
      totalHairLength: Math.PI,\r
    },\r
    FormWatcher: useMemo(\r
      () =>\r
        function FormWatcher({ form, formValue: v }) {\r
          const t = v.hair.reduce((a, b) => a + b.length, 0);\r
          useEffect(() => {\r
            form.setField('totalHairLength', t);\r
          }, [form, t]);\r
          return null;\r
        },\r
      []\r
    ),\r
    action: async v => alert('\u{1F389}' + JSON.stringify(v, null, 4)),\r
  });\r
\r
  const rules = Form.defineRules({\r
    totalHairLength: {\r
      type: 'number',\r
      min: 10,\r
    },\r
    hairItem: {\r
      type: 'string',\r
      validator: (value: string) => {\r
        console.log(value);\r
        if (value.length < 5) {\r
          return 'too short';\r
        }\r
      },\r
    },\r
  });\r
\r
  return (\r
    <>\r
      <Form form={form}>\r
        <Form.Item label="User Name" name="name" rules={{ required: true }}>\r
          <Input />\r
        </Form.Item>\r
        <Form.List name="hair">\r
          {(keys, { add, remove }) => (\r
            <>\r
              {keys.map((key, index) => (\r
                <div key={key}>\r
                  <Form.Item\r
                    label={\`User Hair \${key}\`}\r
                    name={\`hair.\${index}\`}\r
                    rules={rules.hairItem}\r
                  >\r
                    <Input />\r
                  </Form.Item>\r
                  <Button onClick={() => remove(index)}>Remove</Button>\r
                  <br />\r
                  <br />\r
                </div>\r
              ))}\r
              {keys.length < 4 ? <Button onClick={() => add('')}>Add</Button> : null}\r
              &nbsp;\r
              {keys.length < 10 ? (\r
                <Button onClick={() => add('www', 0)}>Add From Start</Button>\r
              ) : null}\r
            </>\r
          )}\r
        </Form.List>\r
        <Form.Item name="totalHairLength" rules={rules.totalHairLength}>\r
          {({ value }) => <span>total: {value}</span>}\r
        </Form.Item>\r
        <Form.SubmitButton>\u63D0\u4EA4 Submit</Form.SubmitButton>\r
        <br />\r
        <br />\r
        <Button\r
          onClick={() =>\r
            form.set(v => ({\r
              ...v,\r
              hair: ['asd', 'asdddd'],\r
            }))\r
          }\r
        >\r
          Set list value using form instance method\r
        </Button>\r
      </Form>\r
    </>\r
  );\r
};\r
export default Demo;\r
`,M=`import React, { useState } from 'react';\r
import { Form, Input } from '\u{1F984}';\r
import type { IRuleItem } from '\u{1F984}/shared';\r
\r
const apiUser = (s: string) => {\r
  return new Promise((resolve, reject) => {\r
    setTimeout(() => {\r
      if (/^\\d/.test(s)) {\r
        reject({\r
          code: 666,\r
          message: 'username cannot starts with number 1234567890',\r
        });\r
      } else if (s === 'hack') {\r
        reject({\r
          code: 555,\r
          message: 'server error',\r
        });\r
      }\r
      resolve(0);\r
    }, 2000);\r
  });\r
};\r
\r
type FormValue = {\r
  name: string;\r
};\r
\r
const BasicUsage: React.FC = () => {\r
  const [nameRule, setNameRule] = useState<IRuleItem[]>([{ required: true }]);\r
\r
  const form = Form.useForm<FormValue>({\r
    initialValue: {\r
      name: '',\r
    },\r
    action: [\r
      async v =>\r
        apiUser(v.name)\r
          .then(() => {\r
            alert('\u{1F389} ' + v.name);\r
          })\r
          .catch(async e => {\r
            if (e.code === 666 && e.message) {\r
              form.setError('name', e.message);\r
              setNameRule([\r
                { required: true },\r
                {\r
                  validator(value: string) {\r
                    if (value === v.name) {\r
                      return 'The server don^t like this name, please pick another';\r
                    }\r
                  },\r
                },\r
              ]);\r
            } else {\r
              alert('\u{1F4A2} server error');\r
            }\r
          }),\r
      errors => {\r
        alert('\u{1F4A2}' + JSON.stringify(errors, null, 4));\r
      },\r
    ],\r
  });\r
\r
  return (\r
    <>\r
      <Form form={form}>\r
        <Form.Item label="User Name" name="name" rules={nameRule}>\r
          <Input />\r
        </Form.Item>\r
        <Form.SubmitButton>\u63D0\u4EA4 Submit</Form.SubmitButton>\r
      </Form>\r
    </>\r
  );\r
};\r
export default BasicUsage;\r
`,z=`import React from 'react';\r
import { Form, Input, Collapse } from '\u{1F984}';\r
\r
type FormValue = {\r
  name: string;\r
  name2: string;\r
  hair: string;\r
};\r
\r
const Demo: React.FC = () => {\r
  const form = Form.useForm<FormValue>({\r
    initialValue: {\r
      name: '12',\r
      name2: '12',\r
      hair: '',\r
    },\r
    action: async value =>\r
      new Promise(resolve => {\r
        setTimeout(() => {\r
          alert(\`submit\${JSON.stringify(value)}\`);\r
          resolve();\r
        }, 500);\r
      }),\r
  });\r
  const rules = Form.defineRules({\r
    name: [\r
      { required: true },\r
      {\r
        type: 'string',\r
        min: 5,\r
        message:\r
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni error, quibusdam exercitationem, quidem reprehenderit molestiae dolorem sint consequatur pariatur earum labore natus quis repellendus laudantium fuga accusamus corrupti sapiente incidunt!',\r
      },\r
    ],\r
    hair: [\r
      { type: 'string', min: 5, message: 'User hair must longer than 5' },\r
      { required: true, message: 'hair is rrrrrrequired' },\r
    ],\r
  });\r
\r
  return (\r
    <>\r
      <div style={{ maxWidth: 300 }}>\r
        <Form form={form}>\r
          <Form.Item label="User Name" name="name" rules={rules.name}>\r
            <Input />\r
          </Form.Item>\r
          <Form.Item label="User Name" name="name2" rules={rules.name}>\r
            {(control, meta) => (void meta.alert, (<Input {...control} />))}\r
          </Form.Item>\r
          <Form.Item label="User Hair" name="hair" rules={rules.hair}>\r
            {(control, { error, alert }) => (\r
              <div>\r
                <Input {...control} />\r
                {alert(\r
                  error && (\r
                    <div style={{ margin: '12px 0' }}>\r
                      <span style={{ fontSize: 25 }}>\u{1F353}</span>\r
                      <br />\r
                      <span>message\u5C31\u662F\u7528\u666E\u901A\u7684Collapse\u5B9E\u73B0\u7684</span>\r
                    </div>\r
                  )\r
                )}\r
                {\r
                  <Collapse>\r
                    {error === 'hair is rrrrrrequired' && (\r
                      <div>\r
                        <span>\u6BD4\u5982\u8FD9\u4E2A</span>\r
                      </div>\r
                    )}\r
                  </Collapse>\r
                }\r
              </div>\r
            )}\r
          </Form.Item>\r
          <Form.SubmitButton primary>\u63D0\u4EA4 Submit</Form.SubmitButton>\r
        </Form>\r
      </div>\r
      <br />\r
      <br />\r
    </>\r
  );\r
};\r
export default Demo;\r
`,$=`## Form \u8868\u5355\r
\r
:::demo{basic}\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
\`Form.Item\`\u4F1A\u63A5\u7BA1\u5B50\u5143\u7D20\`value\`\u548C\`onChange\`\u5C5E\u6027\uFF0C\u4E14 onChange \u7684\u7B2C\u4E00\u53C2\u6570\u662F\u503C\u800C\u4E0D\u662F\u4E8B\u4EF6\u3002\u540C\u65F6\u4E5F\u652F\u6301\u4F20\u5165\`render props\`\u4F5C\u5B50\u5143\u7D20\u3002\r
\r
\`Form.Item\`**\u4EC5\u4E3B\u52A8\u8F93\u5165\u65F6\u4F1A\u81EA\u52A8\u89E6\u53D1\u6821\u9A8C**\u3002**\u8282\u6D41\u89C4\u5219\u662F\u8FDE\u7EED\u8F93\u5165\u65F6\u6BCF\u6B21\u5F02\u6B65\u6821\u9A8C\u9700\u7B49\u5F85\u4E0A\u4E00\u6B21\u5B8C\u6210\uFF0C\u5728\u4E0D\u63D0\u4EA4\u4EC5\u8F93\u5165\u7684\u60C5\u51B5\u4E0B\u540C\u65F6\u53EA\u6709\u4E00\u4E2A\u5F02\u6B65\u6821\u9A8C\u5728\u8C03\u7528**\u3002\r
\r
\u8868\u5355\u4F20\u5165\`action\`\uFF0C\u81EA\u52A8\u6821\u9A8C\u6210\u529F\u540E\u81EA\u52A8\u63D0\u4EA4\uFF0C\u81EA\u52A8\u6821\u9A8C\u91CC\u9762\u7684 submit \u6309\u94AE\u4F1A\u81EA\u52A8\u5207\u6362\u5230\u52A0\u8F7D\u72B6\u6001\u3002\r
\r
:::\r
\r
:::demo{computed}\r
\r
### \u8054\u52A8\r
\r
\u4F7F\u7528\`project\`\u53D6\u503C\u3002\r
:::\r
\r
:::demo{pass}\r
\r
### \u76D1\u542C\r
\r
\u4EE5\u91CD\u590D\u5BC6\u7801\u793A\u4F8B\uFF0C\`element-plus\`\u5728\`validator\`\u91CC\u505A\u6821\u9A8C\uFF0C\u4E5F\u53EF\u4EE5\u5728\`useWatch\`\u91CC\u4F7F\u7528\`useEffect\`\u8FBE\u5230\u540C\u6837\u7684\u6548\u679C\u3002\r
\r
\u6CE8\u610F\uFF1A\u653E\`validator\`\u91CC\u6821\u9A8C\u90A3\u4E48\u5728\u63D0\u4EA4\u7684\u65F6\u5019\u4F1A\u56E0\u4E3A\u91CD\u590D\u8C03\u7528\u800C\u591A\u6821\u9A8C\u4E00\u6B21\u3002\r
\r
:::\r
\r
:::demo{list}\r
\r
### \u5217\u8868\r
\r
\u5217\u8868 key \u7531\`Form.List\`\u5B50\u7EC4\u4EF6\u7BA1\u7406\uFF0C\u5E76\u63D0\u4F9B\`add\` \`remove\` \`swap\`\u65B9\u6CD5\uFF0C\u6CE8\u610F\u5982\u679C\u4F7F\u7528\`form.set\`\u8FD9\u79CD\u76F4\u63A5\u8BBE\u7F6E\u8868\u5355\u503C key \u4FBF\u4E0D\u80FD\u8DDF\u7740\u53D8\u5316\u3002\r
\r
:::\r
\r
:::demo{remote}\r
\r
### \u8FDC\u7A0B\u9519\u8BEF\r
\r
\u8FD9\u4E2A\u793A\u4F8B\u91CC\u4E0D\u63A5\u6536\u4EE5\u6570\u5B57\u5F00\u5934\u7684\u540D\u5B57\uFF0C\u5728\u5916\u90E8\u8C03\u7528\`Form.error\`\u5C06\u540D\u79F0\u7F6E\u9519\uFF0C\u5E76\u4E14\u6539\u53D8\`rules\`\uFF0C\u518D\u6B21\u8F93\u5165\u540C\u6837\u7684\u540D\u5B57\u4E5F\u4F1A\u8B66\u544A\u3002\r
\r
:::\r
\r
:::demo{message}\r
\r
### \u9519\u8BEF\u4FE1\u606F\r
\r
\`alert\` \u662F\u7279\u6B8A\u7684\u6298\u53E0\u9762\u677F\uFF0C\u9ED8\u8BA4 24px \u9AD8\u5145\u5F53\u95F4\u8DDD\uFF0C\u5F53\u5728\`render props\` \u6A21\u5F0F\u89E6\u53D1\u4E86 getter \u540E\u9ED8\u8BA4\u7684 \`alert\` \u4F1A\u6D88\u5931\r
\r
:::\r
\r
### \u539F\u7406\r
\r
\u6709\u4EBA\u5206\u6790\u8FC7\u5E02\u9762\u4E0A\u7684\u8868\u5355\uFF0C[React \u8868\u5355\u6E90\u7801\u9605\u8BFB\u7B14\u8BB0 ](https://zhuanlan.zhihu.com/p/352181528)\u3002\r
\r
\`material-ui\` \u548C \`chakra-ui\` \`semantic-ui\` \`react-bootstrap\`\u7B49\u5927\u90E8\u5206\u4E0D\u5177\u5907\u8868\u5355\u9A8C\u8BC1\u529F\u80FD\uFF0C\u53EF\u9009\u7684\u9A8C\u8BC1\u5DE5\u5177\u662F [\`formik\`](https://github.com/formium/formik)\uFF0C formik \u4F7F\u7528 [\`Yup\`](https://formik.org/docs/tutorial#schema-validation-with-yup) \u505A Schema \u9A8C\u8BC1\u3002 \`antd\` \u5373 \`rc-field-form\` \u548C \`element/element-plus\` \u4F7F\u7528[\`async-validator\`](https://github.com/yiminghe/async-validator) \u505A Schema \u9A8C\u8BC1\u3002\r
\r
\`antd\` \u548C \`formik\` \u503E\u5411\u4F7F\u7528\u975E\u53D7\u63A7\u6A21\u5F0F\uFF0C\u5373\u8868\u5355\u72B6\u6001\u4E0D\u653E\u5916\u8FB9\uFF0C\u8FD9\u6837\u7684\u597D\u5904\u4E00\u4E2A\u662F\u8F93\u5165\u65F6\u53EA\u6709\u8868\u5355\u5185\u90E8\u5728\u91CD\u6E32\u67D3\u3002\u5047\u5982\u8868\u5355\u7684\u503C\u653E\u5916\u9762\uFF0C\u6BCF\u6B21\u8F93\u5165(\u5373\`setState\`)\u90FD\u4F1A\u5F15\u8D77\u6301\u6709\u8BE5\u72B6\u6001\u7684\u7EC4\u4EF6\uFF08\u5F88\u53EF\u80FD\u662F\u9875\u9762\uFF09\u7684\u6574\u4F53\u5237\u65B0\u3002\u5F88\u591A\u4E1A\u52A1\u503E\u5411\u4E8E\u5916\u90E8\u8981\u8BBF\u95EE\u5230\u8868\u5355\u7684\u503C\u3002\u6BD4\u5982\u7528\u6237\u8F93\u5165\u4E86 a \u5C31\u663E\u793A b \u8F93\u5165\u6846\uFF0C\u8FD9\u4E2A\u5728\u975E\u53D7\u63A7\u6A21\u5F0F\u662F\u505A\u4E0D\u5230\u7684\uFF0C\u56E0\u4E3A\u5916\u9762\u83B7\u53D6\u4E0D\u5230\u8868\u5355\u91CC\u7684\u72B6\u6001\u3002\r
\r
- \`antd\` \u9ED8\u8BA4\u5C40\u90E8\u5237\u65B0\uFF0C\u56E0\u4E3A\u6BCF\u6B21\u66F4\u65B0\u4F1A\u89E6\u53D1\u6240\u6709[Field \u7684\u56DE\u8C03](https://github.com/react-component/field-form/blob/e118381c2102b36c4ffe7e17a6415df091e772b7/src/Field.tsx#L216)\u8BA9\u5176\u5404\u81EA\u6BD4\u5BF9\u65B0\u65E7\u503C\u5224\u65AD\u662F\u5426\u9700\u8981\u66F4\u65B0\uFF0C\u5728\u4F7F\u7528[render props \u6A21\u5F0F](https://github.com/react-component/field-form/blob/e118381c2102b36c4ffe7e17a6415df091e772b7/docs/examples/renderProps.tsx#L17)\u6B64\u529F\u80FD\u5931\u6548\uFF0C\u8868\u5355\u6574\u4F53\u5237\u65B0\uFF0C\u6240\u4EE5\u6587\u6863\u91CC\u63D0\u793A\u8FD9\u4E2A\u6027\u80FD\u66F4\u5DEE\u3002\r
- \`formik\` \u9ED8\u8BA4\u6574\u4F53\u5237\u65B0\u8868\u5355\uFF0C\u989D\u5916\u7684\u4F18\u5316\u624B\u6BB5\u662F FastField \u7EC4\u4EF6\uFF0C\u8BE5\u7EC4\u4EF6\u6709 shouldComponentUpdate \u65B9\u6CD5\u5404\u81EA\u6BD4\u5BF9\u65B0\u65E7\u503C\uFF0C\u80FD\u591F\u5224\u65AD\u662F\u5426\u9700\u8981\u66F4\u65B0\u3002\r
\r
[ vue \u7531\u4E8E\u4F9D\u8D56\u81EA\u52A8\u6536\u96C6\u6240\u4EE5\u4E0D\u7528\u4F18\u5316](https://www.zhihu.com/question/453332049/answer/1844784032)\u3002\r
\r
\u8868\u5355\u6838\u5FC3\u548C\u5199\u6298\u53E0\u9762\u677F\u4E00\u6837\u7528\u4F20\u7EDF\u7684\u8BA2\u9605\u6A21\u5F0F\u5C31\u80FD\u89E3\u51B3\u3002\r
\r
\`muse-ui\`\u7684\u6E90\u7801\u6BD4\u8F83\u7CBE\u7B80\uFF0C\u63A8\u8350\u5165\u95E8\u9605\u8BFB\uFF0C\u7136\u540E\u662F\`element/element-plus\`\u3002\r
\r
\u60F3\u8FC7\u80FD\u4E0D\u80FD\u628A\u6838\u5FC3\u7B56\u7565\u62BD\u8C61\u6210\u65E0\u6837\u5F0F\u7684\u57FA\u672C hook \u8FD9\u6837\u5982\u679C\u522B\u4EBA\u60F3\u57FA\u4E8E\u81EA\u8EAB\u7684\u4E1A\u52A1\u5B9E\u73B0\u4E00\u4E2A\u5C31\u53EF\u4EE5\u8C03\uFF0C\u4F46\u8868\u5355\u7B56\u7565\u672C\u6765\u5C31\u662F\u5F88\u51F8\u663E\u4F5C\u8005\u7684\u4E2A\u4EBA\u98CE\u683C\uFF0C\u4ECE\u5FC5\u586B\u7684\u661F\u53F7\uFF0C\u5230 validate \u7684\u8282\u6D41\u7B56\u7565\uFF0C\u5230\u63D0\u4EA4\u65F6\u81EA\u52A8\u5C06 string field \u7528\`trim\`\u4FEE\u526A\u3002\u6709\u65F6\u95F4\u914D\u7F6E\u8FD9\u4E9B\u914D\u7F6E\u9879\u5DF2\u7ECF\u4E0D\u5982\u6E90\u7801\u62F7\u8FC7\u53BB\u5199\u4E00\u4E2A\u65B0\u7684\u4E86\u3002\r
\r
### \u53EF\u8BBF\u95EE\u6027\r
\r
\u63D0\u4EA4\u5931\u8D25\u80FD\u8C03\u7528\u7B2C\u4E00\u4E2A\u63A7\u4EF6\u7684\`scrollIntoView\`\u548C\`focus\`\u3002\r
\r
- \u4F9D\u636E\u8868\u5355\u89C4\u8303\uFF0C\u652F\u6301\u9690\u5F0F\u63D0\u4EA4\r
\r
> \u592A\u957F\u4E0D\u770B: **\u6DFB\u52A0 submit \u6309\u94AE\u5373\u53EF\u652F\u6301\u9690\u5F0F\u63D0\u4EA4\u8868\u5355,\u5373\u652F\u6301\u56DE\u8F66\u952E\u63D0\u4EA4**\r
>\r
> 4.10.21.2 Implicit submission\r
> A form element's default button is the first submit button in tree order whose form owner is that form element.\r
>\r
> If the user agent supports letting the user submit a form implicitly (for example, on some platforms hitting the "enter" key while a text control is focused implicitly submits the form), then doing so for a form, whose default button has activation behavior and is not disabled, must cause the user agent to fire a click event at that default button.\r
>\r
> There are pages on the web that are only usable if there is a way to implicitly submit forms, so user agents are strongly encouraged to support this.\r
>\r
> If the form has no submit button, then the implicit submission mechanism must do nothing if the form has more than one field that blocks implicit submission, and must submit the form element from the form element itself otherwise.\r
>\r
> For the purpose of the previous paragraph, an element is a field that blocks implicit submission of a form element if it is an input element whose form owner is that form element and whose type attribute is in one of the following states: Text, Search, URL, Telephone, Email, Password, Date, Month, Week, Time, Local Date and Time, Number\r
>\r
> [HTML Spec form-control-infrastructure.implicit-submission](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission)\r
>\r
> [The Enter Key should Submit Forms, Stop Suppressing it](https://www.tjvantoll.com/2013/01/01/enter-should-submit-forms-stop-messing-with-that/)\r
\r
> W3C \u6807\u51C6\u4E2D\u6709\u5982\u4E0B\u89C4\u5B9A\uFF1A\r
>\r
> When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.\r
>\r
> \u5373\uFF1A\u5F53\u4E00\u4E2A form \u5143\u7D20\u4E2D\u53EA\u6709\u4E00\u4E2A\u8F93\u5165\u6846\u65F6\uFF0C\u5728\u8BE5\u8F93\u5165\u6846\u4E2D\u6309\u4E0B\u56DE\u8F66\u5E94\u63D0\u4EA4\u8BE5\u8868\u5355\u3002\u5982\u679C\u5E0C\u671B\u963B\u6B62\u8FD9\u4E00\u9ED8\u8BA4\u884C\u4E3A\uFF0C\u53EF\u4EE5\u5728 el-form \u6807\u7B7E\u4E0A\u6DFB\u52A0 @submit.native.prevent\u3002\r
>\r
> https://element-plus.org/#/zh-CN/component/form\r
`,J=`## Form \u8868\u5355\r
\r
:::demo{basic}\r
\r
### \u57FA\u672C\u7528\u6CD5\r
\r
\`Form.Item\`\u4F1A\u63A5\u7BA1\u5B50\u5143\u7D20\`value\`\u548C\`onChange\`\u5C5E\u6027\uFF0C\u4E14 onChange \u7684\u7B2C\u4E00\u53C2\u6570\u662F\u503C\u800C\u4E0D\u662F\u4E8B\u4EF6\u3002\u540C\u65F6\u4E5F\u652F\u6301\u4F20\u5165\`render props\`\u4F5C\u5B50\u5143\u7D20\u3002\r
\r
\`Form.Item\`**\u4EC5\u4E3B\u52A8\u8F93\u5165\u65F6\u4F1A\u81EA\u52A8\u89E6\u53D1\u6821\u9A8C**\u3002**\u8282\u6D41\u89C4\u5219\u662F\u8FDE\u7EED\u8F93\u5165\u65F6\u6BCF\u6B21\u5F02\u6B65\u6821\u9A8C\u9700\u7B49\u5F85\u4E0A\u4E00\u6B21\u5B8C\u6210\uFF0C\u5728\u4E0D\u63D0\u4EA4\u4EC5\u8F93\u5165\u7684\u60C5\u51B5\u4E0B\u540C\u65F6\u53EA\u6709\u4E00\u4E2A\u5F02\u6B65\u6821\u9A8C\u5728\u8C03\u7528**\u3002\r
\r
\u8868\u5355\u4F20\u5165\`action\`\uFF0C\u81EA\u52A8\u6821\u9A8C\u6210\u529F\u540E\u81EA\u52A8\u63D0\u4EA4\uFF0C\u81EA\u52A8\u6821\u9A8C\u91CC\u9762\u7684 submit \u6309\u94AE\u4F1A\u81EA\u52A8\u5207\u6362\u5230\u52A0\u8F7D\u72B6\u6001\u3002\r
\r
:::\r
\r
:::demo{computed}\r
\r
### \u8054\u52A8\r
\r
\u4F7F\u7528\`project\`\u53D6\u503C\u3002\r
:::\r
\r
:::demo{pass}\r
\r
### \u76D1\u542C\r
\r
\u4EE5\u91CD\u590D\u5BC6\u7801\u793A\u4F8B\uFF0C\`element-plus\`\u5728\`validator\`\u91CC\u505A\u6821\u9A8C\uFF0C\u4E5F\u53EF\u4EE5\u5728\`useWatch\`\u91CC\u4F7F\u7528\`useEffect\`\u8FBE\u5230\u540C\u6837\u7684\u6548\u679C\u3002\r
\r
\u6CE8\u610F\uFF1A\u653E\`validator\`\u91CC\u6821\u9A8C\u90A3\u4E48\u5728\u63D0\u4EA4\u7684\u65F6\u5019\u4F1A\u56E0\u4E3A\u91CD\u590D\u8C03\u7528\u800C\u591A\u6821\u9A8C\u4E00\u6B21\u3002\r
\r
:::\r
\r
:::demo{list}\r
\r
### \u5217\u8868\r
\r
\u5217\u8868 key \u7531\`Form.List\`\u5B50\u7EC4\u4EF6\u7BA1\u7406\uFF0C\u5E76\u63D0\u4F9B\`add\` \`remove\` \`swap\`\u65B9\u6CD5\uFF0C\u6CE8\u610F\u5982\u679C\u4F7F\u7528\`form.set\`\u8FD9\u79CD\u76F4\u63A5\u8BBE\u7F6E\u8868\u5355\u503C key \u4FBF\u4E0D\u80FD\u8DDF\u7740\u53D8\u5316\u3002\r
\r
:::\r
\r
:::demo{remote}\r
\r
### \u8FDC\u7A0B\u9519\u8BEF\r
\r
\u8FD9\u4E2A\u793A\u4F8B\u91CC\u4E0D\u63A5\u6536\u4EE5\u6570\u5B57\u5F00\u5934\u7684\u540D\u5B57\uFF0C\u5728\u5916\u90E8\u8C03\u7528\`Form.error\`\u5C06\u540D\u79F0\u7F6E\u9519\uFF0C\u5E76\u4E14\u6539\u53D8\`rules\`\uFF0C\u518D\u6B21\u8F93\u5165\u540C\u6837\u7684\u540D\u5B57\u4E5F\u4F1A\u8B66\u544A\u3002\r
\r
:::\r
\r
:::demo{message}\r
\r
### \u9519\u8BEF\u4FE1\u606F\r
\r
\`alert\` \u662F\u7279\u6B8A\u7684\u6298\u53E0\u9762\u677F\uFF0C\u9ED8\u8BA4 24px \u9AD8\u5145\u5F53\u95F4\u8DDD\uFF0C\u5F53\u5728\`render props\` \u6A21\u5F0F\u89E6\u53D1\u4E86 getter \u540E\u9ED8\u8BA4\u7684 \`alert\` \u4F1A\u6D88\u5931\r
\r
:::\r
\r
### \u539F\u7406\r
\r
\u6709\u4EBA\u5206\u6790\u8FC7\u5E02\u9762\u4E0A\u7684\u8868\u5355\uFF0C[React \u8868\u5355\u6E90\u7801\u9605\u8BFB\u7B14\u8BB0 ](https://zhuanlan.zhihu.com/p/352181528)\u3002\r
\r
\`material-ui\` \u548C \`chakra-ui\` \`semantic-ui\` \`react-bootstrap\`\u7B49\u5927\u90E8\u5206\u4E0D\u5177\u5907\u8868\u5355\u9A8C\u8BC1\u529F\u80FD\uFF0C\u53EF\u9009\u7684\u9A8C\u8BC1\u5DE5\u5177\u662F [\`formik\`](https://github.com/formium/formik)\uFF0C formik \u4F7F\u7528 [\`Yup\`](https://formik.org/docs/tutorial#schema-validation-with-yup) \u505A Schema \u9A8C\u8BC1\u3002 \`antd\` \u5373 \`rc-field-form\` \u548C \`element/element-plus\` \u4F7F\u7528[\`async-validator\`](https://github.com/yiminghe/async-validator) \u505A Schema \u9A8C\u8BC1\u3002\r
\r
\`antd\` \u548C \`formik\` \u503E\u5411\u4F7F\u7528\u975E\u53D7\u63A7\u6A21\u5F0F\uFF0C\u5373\u8868\u5355\u72B6\u6001\u4E0D\u653E\u5916\u8FB9\uFF0C\u8FD9\u6837\u7684\u597D\u5904\u4E00\u4E2A\u662F\u8F93\u5165\u65F6\u53EA\u6709\u8868\u5355\u5185\u90E8\u5728\u91CD\u6E32\u67D3\u3002\u5047\u5982\u8868\u5355\u7684\u503C\u653E\u5916\u9762\uFF0C\u6BCF\u6B21\u8F93\u5165(\u5373\`setState\`)\u90FD\u4F1A\u5F15\u8D77\u6301\u6709\u8BE5\u72B6\u6001\u7684\u7EC4\u4EF6\uFF08\u5F88\u53EF\u80FD\u662F\u9875\u9762\uFF09\u7684\u6574\u4F53\u5237\u65B0\u3002\u5F88\u591A\u4E1A\u52A1\u503E\u5411\u4E8E\u5916\u90E8\u8981\u8BBF\u95EE\u5230\u8868\u5355\u7684\u503C\u3002\u6BD4\u5982\u7528\u6237\u8F93\u5165\u4E86 a \u5C31\u663E\u793A b \u8F93\u5165\u6846\uFF0C\u8FD9\u4E2A\u5728\u975E\u53D7\u63A7\u6A21\u5F0F\u662F\u505A\u4E0D\u5230\u7684\uFF0C\u56E0\u4E3A\u5916\u9762\u83B7\u53D6\u4E0D\u5230\u8868\u5355\u91CC\u7684\u72B6\u6001\u3002\r
\r
- \`antd\` \u9ED8\u8BA4\u5C40\u90E8\u5237\u65B0\uFF0C\u56E0\u4E3A\u6BCF\u6B21\u66F4\u65B0\u4F1A\u89E6\u53D1\u6240\u6709[Field \u7684\u56DE\u8C03](https://github.com/react-component/field-form/blob/e118381c2102b36c4ffe7e17a6415df091e772b7/src/Field.tsx#L216)\u8BA9\u5176\u5404\u81EA\u6BD4\u5BF9\u65B0\u65E7\u503C\u5224\u65AD\u662F\u5426\u9700\u8981\u66F4\u65B0\uFF0C\u5728\u4F7F\u7528[render props \u6A21\u5F0F](https://github.com/react-component/field-form/blob/e118381c2102b36c4ffe7e17a6415df091e772b7/docs/examples/renderProps.tsx#L17)\u6B64\u529F\u80FD\u5931\u6548\uFF0C\u8868\u5355\u6574\u4F53\u5237\u65B0\uFF0C\u6240\u4EE5\u6587\u6863\u91CC\u63D0\u793A\u8FD9\u4E2A\u6027\u80FD\u66F4\u5DEE\u3002\r
- \`formik\` \u9ED8\u8BA4\u6574\u4F53\u5237\u65B0\u8868\u5355\uFF0C\u989D\u5916\u7684\u4F18\u5316\u624B\u6BB5\u662F FastField \u7EC4\u4EF6\uFF0C\u8BE5\u7EC4\u4EF6\u6709 shouldComponentUpdate \u65B9\u6CD5\u5404\u81EA\u6BD4\u5BF9\u65B0\u65E7\u503C\uFF0C\u80FD\u591F\u5224\u65AD\u662F\u5426\u9700\u8981\u66F4\u65B0\u3002\r
\r
[ vue \u7531\u4E8E\u4F9D\u8D56\u81EA\u52A8\u6536\u96C6\u6240\u4EE5\u4E0D\u7528\u4F18\u5316](https://www.zhihu.com/question/453332049/answer/1844784032)\u3002\r
\r
\u8868\u5355\u6838\u5FC3\u548C\u5199\u6298\u53E0\u9762\u677F\u4E00\u6837\u7528\u4F20\u7EDF\u7684\u8BA2\u9605\u6A21\u5F0F\u5C31\u80FD\u89E3\u51B3\u3002\r
\r
\`muse-ui\`\u7684\u6E90\u7801\u6BD4\u8F83\u7CBE\u7B80\uFF0C\u63A8\u8350\u5165\u95E8\u9605\u8BFB\uFF0C\u7136\u540E\u662F\`element/element-plus\`\u3002\r
\r
\u60F3\u8FC7\u80FD\u4E0D\u80FD\u628A\u6838\u5FC3\u7B56\u7565\u62BD\u8C61\u6210\u65E0\u6837\u5F0F\u7684\u57FA\u672C hook \u8FD9\u6837\u5982\u679C\u522B\u4EBA\u60F3\u57FA\u4E8E\u81EA\u8EAB\u7684\u4E1A\u52A1\u5B9E\u73B0\u4E00\u4E2A\u5C31\u53EF\u4EE5\u8C03\uFF0C\u4F46\u8868\u5355\u7B56\u7565\u672C\u6765\u5C31\u662F\u5F88\u51F8\u663E\u4F5C\u8005\u7684\u4E2A\u4EBA\u98CE\u683C\uFF0C\u4ECE\u5FC5\u586B\u7684\u661F\u53F7\uFF0C\u5230 validate \u7684\u8282\u6D41\u7B56\u7565\uFF0C\u5230\u63D0\u4EA4\u65F6\u81EA\u52A8\u5C06 string field \u7528\`trim\`\u4FEE\u526A\u3002\u6709\u65F6\u95F4\u914D\u7F6E\u8FD9\u4E9B\u914D\u7F6E\u9879\u5DF2\u7ECF\u4E0D\u5982\u6E90\u7801\u62F7\u8FC7\u53BB\u5199\u4E00\u4E2A\u65B0\u7684\u4E86\u3002\r
\r
### \u53EF\u8BBF\u95EE\u6027\r
\r
\u63D0\u4EA4\u5931\u8D25\u80FD\u8C03\u7528\u7B2C\u4E00\u4E2A\u63A7\u4EF6\u7684\`scrollIntoView\`\u548C\`focus\`\u3002\r
\r
- \u4F9D\u636E\u8868\u5355\u89C4\u8303\uFF0C\u652F\u6301\u9690\u5F0F\u63D0\u4EA4\r
\r
> \u592A\u957F\u4E0D\u770B: **\u6DFB\u52A0 submit \u6309\u94AE\u5373\u53EF\u652F\u6301\u9690\u5F0F\u63D0\u4EA4\u8868\u5355,\u5373\u652F\u6301\u56DE\u8F66\u952E\u63D0\u4EA4**\r
>\r
> 4.10.21.2 Implicit submission\r
> A form element's default button is the first submit button in tree order whose form owner is that form element.\r
>\r
> If the user agent supports letting the user submit a form implicitly (for example, on some platforms hitting the "enter" key while a text control is focused implicitly submits the form), then doing so for a form, whose default button has activation behavior and is not disabled, must cause the user agent to fire a click event at that default button.\r
>\r
> There are pages on the web that are only usable if there is a way to implicitly submit forms, so user agents are strongly encouraged to support this.\r
>\r
> If the form has no submit button, then the implicit submission mechanism must do nothing if the form has more than one field that blocks implicit submission, and must submit the form element from the form element itself otherwise.\r
>\r
> For the purpose of the previous paragraph, an element is a field that blocks implicit submission of a form element if it is an input element whose form owner is that form element and whose type attribute is in one of the following states: Text, Search, URL, Telephone, Email, Password, Date, Month, Week, Time, Local Date and Time, Number\r
>\r
> [HTML Spec form-control-infrastructure.implicit-submission](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission)\r
>\r
> [The Enter Key should Submit Forms, Stop Suppressing it](https://www.tjvantoll.com/2013/01/01/enter-should-submit-forms-stop-messing-with-that/)\r
\r
> W3C \u6807\u51C6\u4E2D\u6709\u5982\u4E0B\u89C4\u5B9A\uFF1A\r
>\r
> When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.\r
>\r
> \u5373\uFF1A\u5F53\u4E00\u4E2A form \u5143\u7D20\u4E2D\u53EA\u6709\u4E00\u4E2A\u8F93\u5165\u6846\u65F6\uFF0C\u5728\u8BE5\u8F93\u5165\u6846\u4E2D\u6309\u4E0B\u56DE\u8F66\u5E94\u63D0\u4EA4\u8BE5\u8868\u5355\u3002\u5982\u679C\u5E0C\u671B\u963B\u6B62\u8FD9\u4E00\u9ED8\u8BA4\u884C\u4E3A\uFF0C\u53EF\u4EE5\u5728 el-form \u6807\u7B7E\u4E0A\u6DFB\u52A0 @submit.native.prevent\u3002\r
>\r
> https://element-plus.org/#/zh-CN/component/form\r
`;const K={"./basic.tsx":U,"./computed.tsx":B,"./list.tsx":E,"./message.tsx":D,"./pass.tsx":N,"./remote.tsx":L},Y={basic:j,computed:P,pass:W,list:O,remote:M,message:z},G={zh:$,en:J},rr=()=>r(x,{requireDemo:K,requireRaw:Y,requireMd:G});export{rr as default};
