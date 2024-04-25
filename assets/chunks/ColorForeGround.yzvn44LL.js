const r=`<script setup lang="ts">\r
import { ref } from 'vue';\r
\r
const colors = ref(['var(--txt-1)', 'var(--txt-2)', 'var(--txt-3)']);\r
<\/script>\r
\r
<template>\r
  <div class="good" style="">\r
    <button\r
      class="mat:air f1 [:-] p-1"\r
      v-for="c in colors"\r
      :style="{ color: c }"\r
    >\r
      蒹葭苍苍 白露为霜 ({{ c }})\r
    </button>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  display: grid;\r
  grid-template: auto / 1fr;\r
  justify-content: start;\r
}\r
\r
</style>\r
`;export{r as default};
