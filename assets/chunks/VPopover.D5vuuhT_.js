const r=`<script lang="ts">\r
export type VPopoverProps = Omit<UsePopperProps, 'popper' | 'anchor'> & {\r
  unmount?: boolean;\r
};\r
<\/script>\r
<script setup lang="ts">\r
import { cloneVNode, h, reactive, ref, toRefs } from 'vue';\r
import { usePopper, UsePopperProps } from './VPopover';\r
import { child, forwardRef } from '../shared';\r
\r
defineOptions({ inheritAttrs: false });\r
\r
const props = withDefaults(defineProps<VPopoverProps>(), { unmount: true });\r
\r
const slots = defineSlots<{\r
  default: (scope: ReturnType<typeof usePopper>) => any;\r
  popper: (scope: ReturnType<typeof usePopper>) => any;\r
}>();\r
\r
const _anchor = ref();\r
const _popper = ref();\r
const anchor = forwardRef(_anchor);\r
const popper = forwardRef(_popper);\r
const pop = usePopper(reactive({ ...toRefs(props), popper, anchor }));\r
\r
const renderDefault = ($attrs: any) =>\r
  cloneVNode(child(slots.default(pop)) || h('i'), {\r
    ...$attrs,\r
  });\r
\r
const renderPopper = ($attrs: any) =>\r
  cloneVNode(child(slots.popper(pop)) || h('i'), {\r
    ...$attrs,\r
    'data-pop': '',\r
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
  <component ref="_anchor" :is="renderDefault($attrs)" />\r
  <Teleport to="body">\r
    <i-edge v-if="pop.open" />\r
    <Transition v-if="animated">\r
      <!-- prettier-ignore -->\r
      <component ref="_popper" v-if="unmount && pop.open" v-show="unmount || pop.open" :is="renderPopper($attrs)" />\r
    </Transition>\r
    <template v-else>\r
      <!-- prettier-ignore -->\r
      <component ref="_popper" v-if="unmount && pop.open" v-show="unmount || pop.open" :is="renderPopper($attrs)" />\r
    </template>\r
    <i-edge v-if="pop.open" />\r
  </Teleport>\r
</template>\r
\r
<style>\r
[data-pop].VActionSheet {\r
  box-shadow:\r
    var(--shadow),\r
    0 0 0 1px var(--mat-air-15);\r
\r
  &:where(:is(.v-enter-from, .v-leave-to)) {\r
    opacity: 0;\r
\r
    &:where([data-dir='bottom']) {\r
      transform: translateY(-10px);\r
    }\r
    &:where([data-dir='top']) {\r
      transform: translateY(10px);\r
    }\r
    &:where([data-dir='left']) {\r
      transform: translateX(-10px);\r
    }\r
    &:where([data-dir='right']) {\r
      transform: translateX(10px);\r
    }\r
  }\r
\r
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
