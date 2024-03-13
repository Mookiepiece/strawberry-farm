<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    class?: any;
    type?: 'submit' | 'reset' | 'button';
  }>(),
  {
    type: 'button',
  },
);
</script>

<template>
  <button class="sf-button" :class="props.class" :type="props.type"><slot /></button>
</template>
