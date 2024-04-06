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
    ariaLabel?: string;
    ariaLabelledby?: string;

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

const erase = () => {
  handleInput({ target: { value: '' } } as any);
  input.value?.focus();
};

const focus = () => input.value?.focus();
const el = ref() as Ref<HTMLDivElement>;
defineExpose({ focus, el });
</script>

<template>
  <div
    class="VInput VTextInput"
    @click.self="input?.focus()"
    @click="e => emit('click', e)"
    ref="el"
    v-bind="$attrs"
  >
    <div class="VInputPrefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </div>
    <div class="VInputSuffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
    <i-feather
      v-if="props.clearable && filled"
      i="x"
      class="VInputEraser"
      tabindex="-1"
      @click="erase"
      aria-hidden="true"
    />
    <textarea
      v-if="props.textarea"
      ref="input"
      class="VInputTrunk"
      :readonly="props.readonly"
      :placeholder="props.placeholder"
      :id="props.id"
      :name="props.name"
      @input="handleInput"
      @focus="emit('focus')"
      @blur="handleBlur"
      :aria-label="props.ariaLabel"
      :aria-labelledby="props.ariaLabelledby"
    />
    <input
      v-else
      ref="input"
      class="VInputTrunk"
      :readonly="props.readonly"
      :placeholder="props.placeholder"
      :id="props.id"
      :name="props.name"
      @input="handleInput"
      @focus="emit('focus')"
      @blur="handleBlur"
      :aria-label="props.ariaLabel"
      :aria-labelledby="props.ariaLabelledby"
    />
  </div>
</template>
