<script setup lang="ts">
import VInput from './VInput.vue';

const props = withDefaults(
  defineProps<{
    class?: any;
  }>(),
  {},
);
</script>

<template>
  <VInput readonly />
</template>
