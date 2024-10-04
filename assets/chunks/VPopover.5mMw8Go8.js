const r=`<script setup lang="ts">\r
import { cloneVNode, h, reactive, ref, toRefs } from 'vue';\r
import { usePopper, UsePopperProps } from '../vue/usePopover';\r
import { child } from '../shared';\r
\r
defineOptions({ inheritAttrs: false });\r
\r
const props = defineProps<Omit<UsePopperProps, 'popper' | 'anchor'>>();\r
\r
const slots = defineSlots<{\r
  default: any;\r
  popper: any;\r
}>();\r
\r
const anchor = ref();\r
const popper = ref();\r
const pop = usePopper(\r
  reactive({\r
    ...toRefs(props),\r
    popper,\r
    anchor,\r
  }),\r
);\r
\r
const forwardRef = ($attrs: any) =>\r
  cloneVNode(child(slots.default()) || h('i'), {\r
    ...$attrs,\r
    ref: anchor,\r
  });\r
\r
defineExpose({\r
  anchor,\r
  popper,\r
  pop,\r
});\r
<\/script>\r
\r
<template>\r
  <component :is="forwardRef($attrs)" />\r
  <Teleport to="body">\r
    <span data-edge tabindex="0" v-if="pop.open"></span>\r
    <div\r
      data-pop\r
      ref="popper"\r
      v-if="pop.open || pop.visible"\r
      class="--action-sheet"\r
    >\r
      <slot name="popper"></slot>\r
    </div>\r
    <span data-edge tabindex="0" v-if="pop.open"></span>\r
  </Teleport>\r
</template>\r
\r
<style>\r
[data-pop].--action-sheet {\r
  &:where(:is(.v-enter-from, .v-leave-to)) {\r
    transform: translateY(-10px);\r
    opacity: 0;\r
  }\r
  &:where(:is(.v-enter-to, .v-leave-from)) {\r
    transform: translateY(0);\r
    opacity: 1;\r
  }\r
  &:where(\r
      :is(\r
          .v-enter-active:not(.v-enter-from),\r
          .v-leave-active:not(.v-leave-from)\r
        )\r
    ) {\r
    transition:\r
      opacity 0.2s var(--curve-wave),\r
      transform 0.2s var(--curve-wave);\r
  }\r
}\r
</style>\r
`;export{r as default};
