<script setup lang="ts">
import { StyleValue, computed, ref } from 'vue';
import { CommonChoice } from './misc';
import VPicker from './VPicker.vue';

const model = defineModel<any>();

const props = defineProps<{
  options?: CommonChoice[];
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
  <VPicker multi ref="picker" :class="[props.class, 'VRadioGroup']" v-model="model" v-bind="props" />
</template>
