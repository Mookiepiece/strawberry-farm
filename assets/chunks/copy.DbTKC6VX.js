const e=`export function copy(value = '') {\r
  const _ = document.activeElement;\r
\r
  const textarea = document.createElement('textarea');\r
  textarea.value = value;\r
  document.body.appendChild(textarea);\r
  textarea.select();\r
  document.execCommand('copy');\r
  textarea.remove();\r
\r
  (_ as any)?.focus?.();\r
}\r
`;export{e as default};
