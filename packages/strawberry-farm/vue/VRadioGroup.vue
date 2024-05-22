<script setup lang="ts" generic="T = undefined">
import { StyleValue, computed, ref } from 'vue';
import { CommonOptionsInput, NormalizedCommonOption } from './misc';
import VListbox from './VListbox.vue';

const model = defineModel<any>();

const props = defineProps<{
  options?: CommonOptionsInput<T>;
  clearable?: boolean;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
}>();

defineSlots<{
  default(props: { option: NormalizedCommonOption<T> }): any;
}>();

const el = ref<any>();
defineExpose({ el: computed(() => el.value?.el) });
</script>

<template>
  <VListbox
    ref="el"
    :clearable="clearable"
    :class="[props.class, 'VRadioGroup']"
    :style="style"
    :disabled="disabled"
    :options="options"
    v-model="model"
    v-slot="{ option }"
  >
    <slot :option="option">
      <div class="VRadioTrunk">
        {{ option.label }}
      </div>
    </slot>
  </VListbox>
</template>
