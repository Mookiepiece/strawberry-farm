<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const model = defineModel<string>({
  required: true,
});

const { placeholder, textarea, trim } = withDefaults(
  defineProps<{
    placeholder?: string;
    textarea?: boolean;
    trim?: boolean;
  }>(),
  { trim: true },
);

const innerModel = ref('');

watchEffect(() => {
  innerModel.value = model.value;
});

const handleInput = (e: Event) => {
  innerModel.value = (e.target as HTMLInputElement).value;
  model.value = trim ? innerModel.value.trim() : innerModel.value;
};

const handleBlur = () => {
  if (trim) innerModel.value = innerModel.value.trim();
};
</script>

<template>
  <div class="sf-input" :class="textarea && 'sf-textarea'">
    <textarea
      v-if="textarea"
      :value="innerModel"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
    <input
      v-else
      :value="innerModel"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
  </div>
</template>
