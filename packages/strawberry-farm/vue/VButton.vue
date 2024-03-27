<script setup lang="ts">
import { StyleValue } from 'vue';

const props = withDefaults(
  defineProps<{
    class?: any;
    style?: StyleValue;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
    loading?: boolean;
    toggle?: boolean;
    pressed?: boolean;
  }>(),
  {
    type: 'button',
  },
);

defineSlots<{
  prefix: any;
  default: any;
  suffix: any;
}>();
</script>

<template>
  <button
    class="Button"
    :class="[props.class, props.loading]"
    :aria-busy="props.loading ? 'true' : undefined"
    :aria-pressed="
      props.toggle ? (props.pressed ? 'true' : 'false') : undefined
    "
    :style="props.style"
    :type="props.type"
    :disabled="props.loading || props.disabled"
  >
    <slot name="prefix"></slot>
    <div v-if="$slots.default" class="Trunk">
      <slot />
    </div>
    <slot name="suffix"></slot>
  </button>
</template>
