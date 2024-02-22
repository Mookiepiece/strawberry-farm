<script setup lang="ts">
import { Toast, ToastBarElement } from '@mookiepiece/strawberry-farm/vue/Toast';

if (!customElements.get('toast-bar')) {
  customElements.define('toast-bar', ToastBarElement);
}
</script>

<template>
  <div class="[A]" style="gap: 10px">
    <button @click="Toast.error('123')">Toast</button>
    <toast-bar />
  </div>
</template>

<style scoped></style>
