const n=`export const sf7 = <T extends keyof HTMLElementTagNameMap | string>(\r
  name: T,\r
  props?: { class?: string; [key: string]: unknown },\r
  children?: (string | Node | undefined)[] | string | Node,\r
) => {\r
  const el = document.createElement(name);\r
\r
  if (props) {\r
    const { class: _class, ...rest } = props;\r
    if (_class) el.setAttribute('class', _class);\r
\r
    for (const [k, v] of Object.entries(rest)) {\r
      v && el.setAttribute(k, '' + v);\r
    }\r
  }\r
\r
  if (children) {\r
    if (Array.isArray(children)) {\r
      el.append(...(children.filter(Boolean) as Node[]));\r
    } else {\r
      el.append(children);\r
    }\r
  }\r
\r
  return el;\r
};\r
\r
export const svg7 = (\r
  name: string,\r
  attributes?: Record<string, any>,\r
  ...children: (Node | undefined)[]\r
) => {\r
  const el = document.createElementNS('http://www.w3.org/2000/svg', name);\r
  attributes &&\r
    Object.entries(attributes).forEach(([k, v]) => el.setAttribute(k, v));\r
  el.append(...(children.filter(Boolean) as Node[]));\r
  return el;\r
};\r
`;export{n as default};
