<script setup lang="ts">
import { VNode, ref, useSlots, watch, watchEffect } from 'vue';
import { IFeatherElement } from '../html/IFeatherElement';

const model = defineModel<string>({
  required: true,
});

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    textarea?: boolean;
    trim?: boolean;
    prefix?: keyof typeof IFeatherElement.names;
  }>(),
  { trim: true },
);

const slots = defineSlots<{
  suffix: VNode;
}>();

const { placeholder, textarea, trim } = props;

const innerModel = ref('');

watch(
  () => ({
    value: model.value,
    trim: props.trim,
  }),
  ({ value, trim }) => {
    if (trim) {
      if (innerModel.value.trim() !== value.trim()) {
        innerModel.value = value.trim();
      }
    }
  },
);

const handleInput = (e: Event) => {
  if (trim) {
    innerModel.value = (e.target as HTMLInputElement).value;
    model.value = innerModel.value.trim();
  } else {
    model.value = (e.target as HTMLInputElement).value;
  }
};

const handleBlur = () => {
  if (trim) innerModel.value = innerModel.value.trim();
};
</script>

<template>
  <div class="sf-input" :class="textarea && 'Textarea'">
    <i-feather v-if="props.prefix" :i="props.prefix" class="sf-input-icon" />
    <textarea
      v-if="textarea"
      :value="trim ? innerModel : model"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
    <input
      v-else
      :value="trim ? innerModel : model"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
    <slot name="suffix"></slot>
  </div>
</template>
