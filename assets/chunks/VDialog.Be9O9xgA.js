const r=`<script setup lang="ts">\r
import { computed } from 'vue';\r
import VModal from './VModal.vue';\r
\r
const model = defineModel();\r
const props = withDefaults(\r
  defineProps<{\r
    width?: number;\r
    title?: string;\r
    strong?: boolean;\r
  }>(),\r
  { width: 800 },\r
);\r
\r
const width = computed(() =>\r
  typeof props.width === 'number' ? props.width + 'px' : props.width,\r
);\r
<\/script>\r
\r
<template>\r
  <VModal\r
    class="VDialog"\r
    :style="{ '--v-width': width }"\r
    v-model="model"\r
    :strong\r
  >\r
    <div class="VDialogHeader">\r
      {{ title }}\r
      <kbd class="ml-auto">Esc</kbd>\r
    </div>\r
    <slot />\r
  </VModal>\r
</template>\r
`;export{r as default};
