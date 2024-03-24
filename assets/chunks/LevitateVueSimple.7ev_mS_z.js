const n=`<script setup lang="ts">\r
import { onUnmounted, ref, watch } from 'vue';\r
import { Bag, levitate } from '@mookiepiece/strawberry-farm/functions';\r
\r
const show = ref(false);\r
\r
const button = ref<Element>();\r
const popper = ref<HTMLDivElement>();\r
\r
const bag = Bag();\r
onUnmounted(bag);\r
\r
watch(\r
  () => [popper.value, show.value] as const,\r
  ([el, show]) => {\r
    if (el) {\r
      bag(\r
        levitate.auto(button.value!, () => {\r
          levitate(button.value!, el, {\r
            offset: 100,\r
          });\r
        }),\r
      );\r
    } else {\r
      if (!show) {\r
        bag();\r
      }\r
    }\r
  },\r
);\r
<\/script>\r
\r
<template>\r
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">\r
    <div style="width: 500%; height: 1000px">\r
      <button\r
        ref="button"\r
        class="sf-button"\r
        @click="show = !show"\r
      >\r
        Nike\r
      </button>\r
      <Teleport to="body">\r
        <div v-if="show" ref="popper" class="levitated fixed (///)">\r
          <div>Content</div>\r
        </div>\r
      </Teleport>\r
    </div>\r
  </div>\r
</template>\r
\r
<style></style>\r
`;export{n as default};
