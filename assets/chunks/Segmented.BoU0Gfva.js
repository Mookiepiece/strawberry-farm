const e=`<script setup lang="ts">\r
import { ref } from 'vue';\r
import { VSegmented } from '@mookiepiece/strawberry-farm';\r
\r
const model = ref('Grapes');\r
<\/script>\r
\r
<template>\r
  <VSegmented\r
    v-model="model"\r
    :options="['Grapes', 'Melon', { value: 'Strawberry', disabled: true }]"\r
  />\r
</template>\r
`;export{e as default};
