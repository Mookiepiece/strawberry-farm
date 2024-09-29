const o=`<script setup lang="ts">\r
import { ref } from 'vue';\r
import ListboxRadios from './ListboxRadios.vue';\r
\r
const model = ref<any>(null);\r
<\/script>\r
\r
<template>\r
  <ListboxRadios v-model="model" :options="[1, 2, 3]" />\r
</template>\r
`;export{o as default};
