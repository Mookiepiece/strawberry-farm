const r=`<script setup lang="ts">\r
import VRadioGroup from '@mookiepiece/strawberry-farm/vue/VRadioGroup.vue';\r
import { ref } from 'vue';\r
\r
const v = ref();\r
\r
const options = ['Yes', 'No', { value: "I'm not sure", disabled: true }];\r
<\/script>\r
\r
<template>\r
  <div class="[B] gap-2">\r
    <div>\r
      <VRadioGroup v-model="v" :options="options" />\r
    </div>\r
    <div>\r
      <VRadioGroup clearable v-model="v" :options="options" />\r
    </div>\r
    <div>\r
      <VRadioGroup disabled clearable v-model="v" :options="options" />\r
    </div>\r
  </div>\r
</template>\r
`;export{r as default};
