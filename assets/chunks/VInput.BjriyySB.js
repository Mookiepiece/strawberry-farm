const n=`<script setup lang="ts">\r
import { Ref, computed } from 'vue';\r
import { ref } from 'vue';\r
\r
const model = defineModel<string>({\r
  default: '',\r
});\r
\r
const props = withDefaults(\r
  defineProps<{\r
    id?: string;\r
    name?: string;\r
\r
    readonly?: boolean;\r
    placeholder?: string;\r
    textarea?: boolean;\r
    trim?: boolean;\r
    clearable?: boolean;\r
    disabled?: boolean;\r
  }>(),\r
  { trim: true },\r
);\r
\r
defineSlots<{\r
  prefix: any;\r
  suffix: any;\r
}>();\r
\r
const emit = defineEmits<{\r
  focus: [];\r
  blur: [];\r
  click: [MouseEvent];\r
}>();\r
\r
const inputEl = ref<HTMLInputElement | HTMLTextAreaElement>();\r
\r
const input = ref<string | null>(null);\r
const output = computed(() =>\r
  input.value === null ? model.value : input.value,\r
);\r
\r
const parse = (v: string) => (props.trim ? v.trim() : v);\r
\r
const handleInput = () => {\r
  model.value = parse((input.value = inputEl.value!.value));\r
};\r
\r
const handleBlur = () => {\r
  emit('blur');\r
  input.value = null;\r
};\r
\r
const erase = () => {\r
  input.value = null;\r
  model.value = '';\r
  inputEl.value?.focus();\r
};\r
\r
const el = ref() as Ref<HTMLDivElement>;\r
defineExpose({ el });\r
<\/script>\r
\r
<template>\r
  <div\r
    class="VInput VTextInput"\r
    @focus="inputEl?.focus()"\r
    @click="e => emit('click', e)"\r
    ref="el"\r
    tabindex="-1"\r
    v-bind="$attrs"\r
  >\r
    <div class="VInputPrefix" v-if="$slots.prefix">\r
      <slot name="prefix"></slot>\r
    </div>\r
    <div class="VInputSuffix" v-if="$slots.suffix">\r
      <slot name="suffix"></slot>\r
    </div>\r
    <i-feather\r
      v-if="clearable && output"\r
      i="x"\r
      class="VInputEraser"\r
      tabindex="-1"\r
      @click="erase"\r
      aria-hidden="true"\r
    />\r
    <component\r
      :is="textarea ? 'textarea' : 'input'"\r
      ref="inputEl"\r
      class="VInputTrunk"\r
      :readonly="readonly"\r
      :placeholder="placeholder"\r
      :id="id"\r
      :name="name"\r
      :value="output"\r
      @input="handleInput"\r
      @focus="emit('focus')"\r
      @blur="handleBlur"\r
    />\r
  </div>\r
</template>\r
`;export{n as default};
