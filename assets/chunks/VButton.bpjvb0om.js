const n=`<script setup lang="ts">\r
import { StyleValue } from 'vue';\r
\r
const props = withDefaults(\r
  defineProps<{\r
    class?: any;\r
    style?: StyleValue;\r
    type?: 'submit' | 'reset' | 'button';\r
    disabled?: boolean;\r
    loading?: boolean;\r
    toggle?: boolean;\r
    pressed?: boolean;\r
  }>(),\r
  {\r
    type: 'button',\r
  },\r
);\r
\r
defineSlots<{\r
  prefix: any;\r
  default: any;\r
  suffix: any;\r
}>();\r
<\/script>\r
\r
<template>\r
  <button\r
    class="VButton"\r
    :class="[props.class, props.loading]"\r
    :aria-busy="props.loading ? 'true' : undefined"\r
    :aria-pressed="\r
      props.toggle ? (props.pressed ? 'true' : 'false') : undefined\r
    "\r
    :style="props.style"\r
    :type="props.type"\r
    :disabled="props.loading || props.disabled"\r
  >\r
    <slot name="prefix"></slot>\r
    <div v-if="$slots.default" class="Trunk">\r
      <slot />\r
    </div>\r
    <slot name="suffix"></slot>\r
  </button>\r
</template>\r
`;export{n as default};
