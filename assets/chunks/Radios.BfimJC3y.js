const r=`<script setup lang="ts">\r
import { ref } from 'vue';\r
import { VRadios } from '@mookiepiece/strawberry-farm';\r
\r
const model = ref(3);\r
<\/script>\r
\r
<template>\r
  <VRadios\r
    v-model="model"\r
    :options="['Grapes', 'Melon', { value: 'Strawberry', disabled: true }]"\r
  />\r
</template>\r
`;export{r as default};
