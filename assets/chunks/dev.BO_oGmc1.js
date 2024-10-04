const e=`export const measure = (id: string, { top, left, width, height }: DOMRect) => {\r
  let el = document.getElementById(id);\r
  if (!el) {\r
    el = document.createElement('div');\r
    el.id = id;\r
    el.style.pointerEvents = 'none';\r
    el.style.boxShadow =\r
      'inset 0 0 0 1px ' +\r
      {\r
        a: '#fa8',\r
        b: '#8af',\r
      }[id[0]];\r
    document.body.appendChild(el);\r
  }\r
\r
  el.style.position = 'fixed';\r
  el.style.top = top + 'px';\r
  el.style.left = left + 'px';\r
  el.style.width = width + 'px';\r
  el.style.height = height + 'px';\r
\r
  return () => el!.remove();\r
};`;export{e as default};
