<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    class?: any;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    type: 'button',
  },
);
</script>

<template>
  <button
    class="Button"
    :class="[props.class, props.loading && '--loading']"
    :type="props.type"
    :disabled="props.loading || props.disabled"
  >
    <slot name="icon"></slot>
    <div v-if="$slots.default" class="Content">
      <slot />
    </div>
  </button>
</template>
