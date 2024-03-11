<script setup lang="ts">
const props = defineProps<{
  class?: any;
}>();

</script>

<template>
  <button class="sf-button" :class="props.class"><slot /></button>
</template>
