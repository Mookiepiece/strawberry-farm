<script setup lang="ts">
import { computed, inject } from 'vue';

const model = defineModel<any>();
const current = defineModel<number | undefined>();

const ctx = inject<{
  toggle(value: any): void;
  id: string;
  powerPointer?: boolean;
}>('VPicker')!;

const props = defineProps<{
  option: {
    label: any;
    value: any;
    disabled: boolean;
    index: number;
  } & Record<string, any>;
}>();

const toggle = computed(() => () => ctx.toggle(props.option.value));
</script>

<template>
  <div
    @click="!option.disabled ? toggle() : undefined"
    @pointermove="ctx.powerPointer ? (current = option.index) : undefined"
    :id="ctx.id + option.index"
    role="option"
    :aria-selected="model"
    :aria-current="option.index === current || undefined"
    :aria-disabled="option.disabled || undefined"
  >
    <slot
      :option="option"
      :selected="model"
      :current="current"
      :toggle="toggle"
    >
      {{ option.label }}
    </slot>
  </div>
</template>
