<script setup lang="ts" generic="T = undefined">
import { StyleValue, computed, ref } from 'vue';
import { CommonOptionsInput, NormalizedCommonOption } from './misc';
import VListbox from './VListbox.vue';

const model = defineModel<any[]>({
  default: [],
});

const props = defineProps<{
  options?: CommonOptionsInput<T>;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
}>();

defineSlots<{
  default(props: { option: NormalizedCommonOption<T> }): any;
  indicator: any;
}>();

const el = ref<any>();
defineExpose({ el: computed(() => el.value?.el) });
</script>

<template>
  <VListbox
    ref="el"
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
