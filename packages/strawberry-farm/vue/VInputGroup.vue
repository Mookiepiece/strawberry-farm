<script setup lang="ts">

const { placeholder } = defineProps<{
  placeholder?: string
}>();

</script>

<template>
  <div class="sf-input-group">
    <input :placeholder="placeholder" />
  </div>
</template>
