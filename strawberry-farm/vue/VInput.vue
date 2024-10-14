<script setup lang="ts">
import { Ref, computed } from 'vue';
import { ref } from 'vue';

const model = defineModel<string>({
  default: '',
});

const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;

    readonly?: boolean;
    placeholder?: string;
    textarea?: boolean;
    trim?: boolean;
    clearable?: boolean;
    disabled?: boolean;
  }>(),
  { trim: true },
);

defineSlots<{
  prefix: any;
  suffix: any;
}>();

const emit = defineEmits<{
  focus: [];
  blur: [];
  click: [MouseEvent];
}>();

const inputEl = ref<HTMLInputElement | HTMLTextAreaElement>();

const input = ref<string | null>(null);
const output = computed(() =>
  input.value === null ? model.value : input.value,
);

const parse = (v: string) => (props.trim ? v.trim() : v);

const handleInput = () => {
  model.value = parse((input.value = inputEl.value!.value));
};

const handleBlur = () => {
  emit('blur');
  input.value = null;
};

const erase = () => {
  input.value = null;
  model.value = '';
  inputEl.value?.focus();
};

const el = ref() as Ref<HTMLDivElement>;
defineExpose({ el });
</script>

<template>
  <div
    class="VInput VTextInput"
    @focus="inputEl?.focus()"
    @click="e => emit('click', e)"
    ref="el"
    tabindex="-1"
    v-bind="$attrs"
  >
    <div class="VInputPrefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </div>
    <div class="VInputSuffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
    <i-feather
      v-if="clearable && output"
      i="x"
      class="VEraser"
      tabindex="-1"
      @click="erase"
      aria-hidden="true"
    />
    <component
      :is="textarea ? 'textarea' : 'input'"
      ref="inputEl"
      class="VInputTrunk"
      :readonly="readonly"
      :placeholder="placeholder"
      :id="id"
      :name="name"
      :value="output"
      @input="handleInput"
      @focus="emit('focus')"
      @blur="handleBlur"
    />
  </div>
</template>
