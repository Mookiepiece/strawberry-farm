const n=`<script setup lang="ts" generic="T = undefined">\r
import { computed, ref } from 'vue';\r
import {\r
  applyTransform,\r
  flip,\r
  maxHeight,\r
  sameWidth,\r
} from '../shared';\r
import { CommonOptionsInput, flatCommonOptionsInput } from './misc';\r
import VListbox from '../patterns/VListbox.vue';\r
\r
const model = defineModel<any>();\r
\r
const props = withDefaults(\r
  defineProps<{\r
    options?: CommonOptionsInput<T>;\r
    disabled?: boolean;\r
    placeholder?: string;\r
    clearable?: boolean;\r
  }>(),\r
  {},\r
);\r
\r
defineSlots<{\r
  prefix: any;\r
  suffix: any;\r
}>();\r
\r
const multi = computed(() => Array.isArray(model.value));\r
\r
const reference = ref<HTMLElement>();\r
const popper = ref<HTMLElement>();\r
\r
// const { open, visible } = usePopper({\r
//   popper,\r
//   reference,\r
//   configs: {\r
//     offset: 5,\r
//     animated: true,\r
//     trap: true,\r
//     clickAway: true,\r
//   },\r
//   plugins: [sameWidth, flip(), maxHeight, applyTransform],\r
// });\r
\r
const erase = () => {\r
  if (multi.value) {\r
    model.value.splice(0, model.value.length);\r
    model.value = model.value;\r
  } else model.value = null;\r
  reference.value?.focus();\r
};\r
\r
const pickerModel = computed({\r
  get() {\r
    return model.value;\r
  },\r
  set(value) {\r
    if (!multi.value) open.value = false;\r
    model.value = value;\r
  },\r
});\r
\r
const label = computed(() => {\r
  if (!props.options) return model.value;\r
\r
  const choices = flatCommonOptionsInput(props.options);\r
  return multi.value\r
    ? choices\r
        .filter(o => model.value?.includes(o.value))\r
        .map(o => o.label)\r
        .join(', ')\r
    : choices.find(o => o.value === model.value)?.label;\r
});\r
\r
const empty = computed(() =>\r
  multi.value ? !model.value?.length : model.value == null,\r
);\r
\r
defineExpose({\r
  el: reference,\r
});\r
<\/script>\r
\r
<template>\r
  <!-- <div\r
    class="VInput VSelect"\r
    tabindex="0"\r
    ref="reference"\r
    @click.self="open = !open"\r
    @keydown.space="open = true"\r
    @keydown.enter="open = true"\r
    @keydown.up="open = true"\r
    @keydown.down="open = true"\r
    role="button"\r
    aria-haspopup="true"\r
    :aria-expanded="open"\r
    v-bind="$attrs"\r
  >\r
    <div class="VInputPrefix" v-if="$slots.prefix">\r
      <slot name="prefix"></slot>\r
    </div>\r
    <div class="VInputSuffix" v-if="$slots.suffix">\r
      <slot name="suffix"></slot>\r
    </div>\r
    <i-feather\r
      v-if="clearable && !disabled && !empty"\r
      i="x"\r
      class="VInputEraser"\r
      tabindex="-1"\r
      @click="erase"\r
      aria-hidden="true"\r
    />\r
    <div\r
      class="VInputTrunk"\r
      :class="empty ? 'VInputTrunkPlaceholder' : undefined"\r
    >\r
      {{ label ?? placeholder }}\r
    </div>\r
  </div>\r
\r
  <Teleport to="body">\r
    <div\r
      v-show="open || visible"\r
      ref="popper"\r
      data-pop\r
      @keydown.esc="open = false"\r
      style="position: fixed; top: 0; left: 0"\r
    >\r
      <div data-pop-box>\r
        <VListbox\r
          :multi="multi"\r
          magnetic\r
          v-model="pickerModel"\r
          :options="options"\r
          class="VSelectPicker"\r
        />\r
      </div>\r
    </div>\r
  </Teleport> -->\r
</template>\r
`;export{n as default};
