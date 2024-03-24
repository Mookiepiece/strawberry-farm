const e=`<script setup lang="ts">\r
import { collapse } from '@mookiepiece/strawberry-farm/vue/Collapse';\r
import { ref } from 'vue';\r
\r
const a = ref<HTMLDivElement>();\r
const b = ref<HTMLDivElement>();\r
<\/script>\r
\r
<template>\r
  <button @click="a && collapse.toggle(a)">toggle</button>\r
  <div ref="a" class="(///)">\r
    <div class="p-4" style="border: 40px dotted var(--mat-air-2)">\r
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid magni,\r
      veniam sapiente aperiam dolorum vero eos hic repellat quasi deserunt optio\r
      voluptatem expedita aut quam laborum culpa quaerat facere quisquam?\r
    </div>\r
  </div>\r
  <div></div>\r
  <button @click="b && collapse.toggle(b)">toggle</button>\r
  <div ref="b" class="(///) Collapsed">\r
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid magni,\r
    veniam sapiente aperiam dolorum vero eos hic repellat quasi deserunt optio\r
    voluptatem expedita aut quam laborum culpa quaerat facere quisquam?\r
  </div>\r
</template>\r
\r
<style scoped>\r
div {\r
  max-width: 300px;\r
}\r
</style>\r
`;export{e as default};
