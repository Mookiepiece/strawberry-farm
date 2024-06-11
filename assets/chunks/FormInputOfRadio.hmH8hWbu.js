const r=`<template>\r
  <label class="[SF]">\r
    <input type="radio" name="1" value="1" class="my-radio" />\r
    <div>description</div>\r
  </label>\r
  <label class="[SF]" style="height: 100px;">\r
    <input type="radio" name="1" value="2" class="my-radio" />\r
    <div>description</div>\r
  </label>\r
  <label class="[SF]">\r
    <input type="radio" disabled name="1" value="3" class="my-radio" />\r
    <div>description</div>\r
  </label>\r
</template>\r
\r
<style scoped>\r
\r
:where(.my-radio:focus-visible + div, .my-radio:not(:disabled) + div:hover) {\r
  background: var(--vp-c-gray-3);\r
}\r
\r
:where(.my-radio:checked + div) {\r
  background: var(--vp-c-gray-1);\r
}\r
</style>\r
`;export{r as default};
