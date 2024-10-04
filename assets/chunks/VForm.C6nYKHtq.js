const r=`<script setup lang="ts" generic="T">\r
import { provide } from 'vue';\r
import { FormModel, V_FORM_IN } from './Form';\r
\r
const props = defineProps<{\r
  form: FormModel<T>;\r
}>();\r
\r
provide(V_FORM_IN, props.form);\r
\r
<\/script>\r
\r
<template>\r
  <form class="VForm" @submit.prevent="void props.form.submit()">\r
    <slot />\r
  </form>\r
</template>\r
`;export{r as default};
