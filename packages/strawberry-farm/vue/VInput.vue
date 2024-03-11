<script setup lang="ts">
import { ref, watch } from 'vue';
import { IFeatherElement } from '../html/IFeatherElement';

const model = defineModel<string>({
  default: '',
});

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    textarea?: boolean;
    trim?: boolean;
    prefix?: keyof typeof IFeatherElement.names;
    suffix?: keyof typeof IFeatherElement.names;
    clearable?: boolean;
    disabled?: boolean;
  }>(),
  { trim: true },
);

const slots = defineSlots<{
  prepend: any;
  append: any;
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
  if (props.trim) input.value!.value = input.value!.value.trim();
};

const clean = () => {
  handleInput({ target: { value: '' } } as any);
  input.value?.focus();
};
</script>

<template>
  <div
    class="sf-input"
    :class="[
      props.textarea && '--textarea',
      props.disabled && '--disabled',
      props.prefix && '--has-prefix',
      props.suffix && '--has-suffix',
    ]"
    @click.self="input?.focus()"
  >
    <div class="sf-input-prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <i-feather v-if="props.prefix" :i="props.prefix" class="sf-input-icon" />
    <textarea
      v-if="props.textarea"
      ref="input"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="props.placeholder"
    />
    <input
      v-else
      ref="input"
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
    <i-feather v-if="props.suffix" :i="props.suffix" class="sf-input-icon" />
    <div class="sf-input-append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
