const n=`<script setup lang="ts">\r
import { onUnmounted, ref } from 'vue';\r
import { Bag, onTimeout, trap } from '../shared';\r
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
const bag = Bag();\r
onUnmounted(() => bag());\r
\r
const curtain = ref<HTMLElement>();\r
\r
const afterEnter = () => {\r
  const $ = curtain.value;\r
  if ($) bag(trap($));\r
};\r
\r
const close = () => void (!props.strong && (model.value = false));\r
\r
let down = false;\r
const _bag = Bag();\r
const handlePointerdown = () => (\r
  (down = true), _bag(onTimeout(() => (down = false)))\r
);\r
const handlePointerUp = () => down && close();\r
<\/script>\r
\r
<template>\r
  <Teleport to="body">\r
    <Transition @enter="afterEnter" @leave="() => bag()">\r
      <div\r
        v-if="model"\r
        @keydown.esc="close"\r
        class="VCurtain"\r
        @pointerdown.self.prevent="handlePointerdown"\r
        @pointerup.self.prevent="handlePointerUp"\r
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
