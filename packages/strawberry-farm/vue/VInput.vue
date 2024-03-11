<script setup lang="ts">
import { VNode, ref, watch } from 'vue';
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
  }>(),
  { trim: true },
);

const slots = defineSlots<{
  prepend: VNode;
  append: VNode;
}>();

const { placeholder, textarea, trim } = props;

const input = ref<HTMLInputElement | HTMLTextAreaElement>();

const filled = ref(false);

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
  model.value = value = trim ? value.trim() : value;
  filled.value = !!value;
};

const handleBlur = () => {
  if (trim) input.value!.value = input.value!.value.trim();
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
      textarea && '--textarea',
      props.prefix && '--has-prefix',
      props.suffix && '--has-suffix',
    ]"
  >
    <div class="sf-input-prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <i-feather v-if="props.prefix" :i="props.prefix" class="sf-input-icon" />
    <textarea
      v-if="textarea"
      ref="input"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
    <input
      v-else
      ref="input"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
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
