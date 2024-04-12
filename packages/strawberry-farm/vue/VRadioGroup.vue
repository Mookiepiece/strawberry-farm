<script setup lang="ts">
import { StyleValue, computed, ref } from 'vue';
import { CommonOptionsInput } from './misc';
import VPicker from './VPicker.vue';

const model = defineModel<any>();

const props = defineProps<{
  options?: CommonOptionsInput;
  clearable?: boolean;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
}>();

const picker = ref<InstanceType<typeof VPicker>>();

defineExpose({
  el: computed(() => picker.value?.el),
});
</script>

<template>
  <VPicker
    ref="picker"
    :mode="clearable ? 'clearable' : 'powerCursor'"
    :class="[props.class, 'VRadioGroup']"
    :style="style"
    :disabled="disabled"
    :options="options"
    v-model="model"
  >
  </VPicker>
</template>
