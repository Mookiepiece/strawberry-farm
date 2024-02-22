<script setup lang="ts">
import { Toast } from '@mookiepiece/strawberry-farm/vue/Toast';
</script>

<template>
  <div class="[A]" style="gap: 10px">
    <button @click="Toast.error('123')">Toast</button>
  </div>
</template>

<style scoped></style>
