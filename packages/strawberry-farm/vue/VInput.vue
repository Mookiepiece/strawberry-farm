<script setup lang="ts">
import { ref, watch } from 'vue';

const model = defineModel<string>({
  default: '',
});

const props = withDefaults(
  defineProps<{
    readonly?: boolean;
    placeholder?: string;
    textarea?: boolean;
    trim?: boolean;
    clearable?: boolean;
    disabled?: boolean;
  }>(),
  { trim: true },
);

const emit = defineEmits<{
  focus: [];
  blur: [];
}>();

const input = ref<HTMLInputElement | HTMLTextAreaElement>();

const filled = ref(false);

// Reference: How vue "v-model.trim" behaves https://github.com/vuejs/core/blob/9a936aaec489c79433a32791ecf5ddb1739a62bd/packages/runtime-dom/src/directives/vModel.ts#L48
watch(
  () => ({ value: model.value, trim: props.trim, input: input.value }),
  ({ value, trim, input }) => {
    if (input) {
      if (trim) {
        if (input.value.trim() !== value.trim()) {
          input.value = value.trim();
          filled.value = !!value;
        }
      } else {
        if (input.value !== value) {
          input.value = value;
          filled.value = !!value;
        }
      }
    }
  },
);

const handleInput = (e: Event) => {
  let value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
  model.value = value = props.trim ? value.trim() : value;
  filled.value = !!value;
};

const handleBlur = () => {
  emit('blur');
  if (props.trim) input.value!.value = input.value!.value.trim();
};

const clean = () => {
  handleInput({ target: { value: '' } } as any);
  input.value?.focus();
};

const focus = () => input.value?.focus();
const el = ref<HTMLDivElement | null>(null);
defineExpose({ focus });
</script>

<template>
  <div
    class="sf-input"
    :class="[props.textarea && '--textarea', props.disabled && '--disabled']"
    @click.self="input?.focus()"
    ref="el"
  >
    <div class="sf-input-prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </div>
    <div class="sf-input-suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
    <textarea
      v-if="props.textarea"
      ref="input"
      @input="handleInput"
      @focus="$emit('focus')"
      @blur="handleBlur"
      :placeholder="props.placeholder"
    />
    <input
      v-else
      ref="input"
      :readonly="props.readonly"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="props.placeholder"
    />
    <i-feather
      v-if="props.clearable && filled"
      i="x"
      class="sf-input-clean"
      tabindex="-1"
      @click="clean"
    />
  </div>
</template>
