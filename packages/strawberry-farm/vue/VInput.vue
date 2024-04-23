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

const input = ref<HTMLInputElement | HTMLTextAreaElement>();

const userInput = ref<string | null>(null);
const userOutput = computed(() =>
  userInput.value === null ? model.value : userInput.value,
);

const parse = (v: string) => (props.trim ? v.trim() : v);

const handleInput = () => {
  model.value = parse((userInput.value = input.value!.value));
};

const handleBlur = () => {
  emit('blur');
  userInput.value = null;
};

const erase = () => {
  userInput.value = null;
  model.value = '';
  input.value?.focus();
};

const el = ref() as Ref<HTMLDivElement>;
defineExpose({ el });
</script>

<template>
  <div
    class="VInput VTextInput"
    @focus="input?.focus()"
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
      v-if="props.clearable && userOutput"
      i="x"
      class="VInputEraser"
      tabindex="-1"
      @click="erase"
      aria-hidden="true"
    />
    <component
      :is="props.textarea ? 'textarea' : 'input'"
      ref="input"
      class="VInputTrunk"
      :readonly="props.readonly"
      :placeholder="props.placeholder"
      :id="props.id"
      :name="props.name"
      :value="userOutput"
      @input="handleInput"
      @focus="emit('focus')"
      @blur="handleBlur"
    />
  </div>
</template>
