const n=`<script setup lang="ts">\r
import { ref, watchEffect } from 'vue';\r
import { trap } from '../shared';\r
\r
defineOptions({\r
  inheritAttrs: false,\r
});\r
\r
const model = defineModel();\r
\r
const props = defineProps<{\r
  strong?: boolean;\r
}>();\r
\r
const curtain = ref<HTMLElement>();\r
watchEffect(onCleanup => {\r
  const $ = curtain.value;\r
  $ && onCleanup(trap($));\r
});\r
\r
const close = () => void (!props.strong && (model.value = false));\r
<\/script>\r
\r
<template>\r
  <Teleport to="body">\r
    <Transition>\r
      <div\r
        v-if="model"\r
        class="VCurtain"\r
        @keydown.esc.prevent="close"\r
        @click.self.prevent="close"\r
        tabindex="-1"\r
        ref="curtain"\r
      >\r
        <div class="VModal" v-bind="$attrs">\r
          <slot />\r
        </div>\r
      </div>\r
    </Transition>\r
  </Teleport>\r
</template>\r
`;export{n as default};
