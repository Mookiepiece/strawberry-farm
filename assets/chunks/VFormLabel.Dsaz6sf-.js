const r=`<script setup lang="ts">\r
import { inject } from 'vue';\r
import { V_FORM_ITEM_LABEL_IN } from './Form';\r
\r
const _ = inject(V_FORM_ITEM_LABEL_IN) || { id: '', asterisk: false };\r
const focus = () => document.getElementById(_.id!)?.focus();\r
<\/script>\r
\r
<template>\r
  <label v-if="_.id && _.label" :for="_.id" tabindex="-1" @focus="focus"\r
    >{{ _.label }}\r
    <span class="clr-main" v-if="_.asterisk">*</span>\r
  </label>\r
</template>\r
`;export{r as default};
