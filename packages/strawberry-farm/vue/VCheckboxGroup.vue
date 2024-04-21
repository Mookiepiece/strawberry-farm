<script setup lang="ts">
import { StyleValue, computed, ref } from 'vue';
import { CommonOptionsInput, NormalizedCommonOption } from './misc';
import VListbox from './VListbox.vue';

const model = defineModel<any>();

const props = defineProps<{
  options?: CommonOptionsInput;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
}>();

defineSlots<{
  default(props: { option: NormalizedCommonOption }): any;
  indicator: any;
}>();

const el = ref<InstanceType<typeof VListbox>>();
defineExpose({ el: computed(() => el.value?.el) });
</script>

<template>
  <VListbox
    ref="el"
    mode="multi"
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
    <slot name="indicator">
      <div class="VCheckboxIndicator">
        <i-feather i="check" />
      </div>
    </slot>
  </VListbox>
</template>
