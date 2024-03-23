<script setup lang="ts">
import { Ref } from 'vue';
import { ref, watch } from 'vue';

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

const emit = defineEmits<{
  focus: [];
  blur: [];
  click: [MouseEvent];
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
const el = ref() as Ref<HTMLDivElement>;
defineExpose({ focus, el });
</script>

<template>
  <div
    class="sf-input"
    :class="[props.textarea && '--textarea', props.disabled && '--disabled']"
    @click.self="input?.focus()"
    @click="e => emit('click', e)"
    ref="el"
  >
    <div aria-label="Input Prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </div>
    <div aria-label="Input Suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
    <i-feather
      v-if="props.clearable && filled"
      i="x-circle"
      class="sf-input-clean"
      tabindex="-1"
      @click="clean"
    />
    <textarea
      v-if="props.textarea"
      ref="input"
      :readonly="props.readonly"
      :placeholder="props.placeholder"
      :id="props.id"
      :name="props.name"
      @input="handleInput"
      @focus="emit('focus')"
      @blur="handleBlur"
    />
    <input
      v-else
      ref="input"
      :readonly="props.readonly"
      :placeholder="props.placeholder"
      :id="props.id"
      :name="props.name"
      @input="handleInput"
      @focus="emit('focus')"
      @blur="handleBlur"
    />
  </div>
</template>
