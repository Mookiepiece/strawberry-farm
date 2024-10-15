const r=`export const requestSubmit = (el: Element) => {\r
  const form = el.closest('form');\r
  if (!form) return;\r
\r
  if (\r
    [...form.querySelectorAll(':is(input,button)[type="submit"]')].every(btn =>\r
      btn.hasAttribute('disabled'),\r
    )\r
  )\r
    return;\r
\r
  form?.requestSubmit();\r
};\r
`;export{r as default};
