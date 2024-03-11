<script setup lang="ts">
import VInput from './VInput.vue';

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
  <VInput />
</template>
