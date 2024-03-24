const r=`<script setup lang="ts">\r
import VCheckboxGroup from '@mookiepiece/strawberry-farm/vue/VCheckboxGroup.vue';\r
import { ref } from 'vue';\r
\r
const v = ref([]);\r
\r
const options = ['Yes', 'No', { value: "I'm not sure", disabled: true }];\r
<\/script>\r
\r
<template>\r
  <VCheckboxGroup v-model="v" :options="options" />\r
</template>\r
`;export{r as default};
