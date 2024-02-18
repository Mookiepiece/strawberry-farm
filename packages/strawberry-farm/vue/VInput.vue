<script setup lang="ts">

const { placeholder } = defineProps<{
  placeholder?: string
}>();

</script>

<template>
  <div class="sf-input [s]">
    <input :placeholder="placeholder" />
  </div>
</template>
