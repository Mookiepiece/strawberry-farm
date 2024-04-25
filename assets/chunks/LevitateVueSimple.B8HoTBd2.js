const e=`<script setup lang="ts">\r
import { ref, watchEffect } from 'vue';\r
import { levitate } from '@mookiepiece/strawberry-farm/functions';\r
\r
const open = ref(false);\r
\r
const button = ref<HTMLElement>();\r
const popper = ref<HTMLDivElement>();\r
\r
watchEffect(onCleanup => {\r
  const $ref = button.value;\r
  const $popper = popper.value;\r
  const $open = open.value;\r
  if ($ref && $popper && $open) {\r
    onCleanup(\r
      levitate.auto($ref, () => {\r
        levitate($ref, $popper, {\r
          offset: 100,\r
        });\r
      }),\r
    );\r
  }\r
});\r
<\/script>\r
\r
<template>\r
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">\r
    <div style="width: 500%; height: 1000px">\r
      <button ref="button" @click="open = !open">Reference</button>\r
      <Teleport to="body">\r
        <div v-if="open" ref="popper" class="levitated (///)">\r
          <div>Content</div>\r
        </div>\r
      </Teleport>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.levitated {\r
  position: fixed;\r
  left: 0;\r
  top: 0;\r
}\r
</style>\r
`;export{e as default};
