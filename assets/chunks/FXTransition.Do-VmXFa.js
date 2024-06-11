const r=`<script setup lang="ts">\r
import { fx } from '@mookiepiece/strawberry-farm/functions';\r
import { ref } from 'vue';\r
\r
const open = ref(true);\r
const div = ref<HTMLDivElement>();\r
\r
const toggle = () => {\r
  const el = div.value!;\r
\r
  open.value = !open.value;\r
\r
  if (!open.value) {\r
    fx.cssTransition(el, 'fx-demo-leave', {\r
      done() {\r
        el.setAttribute('hidden', '');\r
      },\r
    });\r
  } else {\r
    el.removeAttribute('hidden');\r
    fx.cssTransition(el, 'fx-demo-enter');\r
  }\r
};\r
<\/script>\r
\r
<template>\r
  <div>\r
    <button @click="toggle">CSS</button>\r
    <div ref="div" class="fx-demo">\r
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur\r
      sequi, natus placeat hic fugiat corrupti. Ab maiores, minima debitis qui\r
      minus cupiditate, ullam quo earum veniam sapiente asperiores deserunt\r
      quis?\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.fx-demo-enter-from,\r
.fx-demo-leave-to {\r
  background-color: #f9ca;\r
  transform: translateX(100px) scale(0);\r
}\r
\r
.fx-demo-enter-active {\r
  transition:\r
    background-color 0.5s,\r
    transform 1s;\r
}\r
\r
.fx-demo-leave-active {\r
  transition: all 0.5s;\r
}\r
</style>\r
`;export{r as default};
