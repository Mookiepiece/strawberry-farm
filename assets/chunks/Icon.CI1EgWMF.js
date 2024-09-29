const r=`<script setup lang="ts">\r
import { onMounted } from 'vue';\r
import { ref } from 'vue';\r
\r
const z = ref<any[]>([]);\r
\r
onMounted(() => {\r
  import('@mookiepiece/strawberry-farm/html/IFeatherElement').then(\r
    ({ IFeatherElement }) => {\r
      IFeatherElement.install();\r
      z.value = Object.keys(IFeatherElement.names);\r
    },\r
  );\r
});\r
<\/script>\r
\r
<template>\r
  <div class="good">\r
    <div class="good-cell [A] [CC] mat:air gap-1 p-2" v-for="k in z">\r
      <i-feather style="font-size: 24px" :i="k"></i-feather>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  display: grid;\r
  grid: auto-flow 1fr / repeat(auto-fill, 50px);\r
  place-items: center;\r
}\r
\r
.good-cell {\r
  border-radius: 10px;\r
  cursor: pointer;\r
  user-select: none;\r
}\r
</style>\r
`;export{r as default};
