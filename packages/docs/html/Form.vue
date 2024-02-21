<script setup lang="ts">
import VInput from '@mookiepiece/strawberry-farm/vue/VInput.vue';
import VInputGroup from '@mookiepiece/strawberry-farm/vue/VInputGroup.vue';
</script>

<template>
  <div class="[A]" style="gap: 10px">
    <VInput placeholder="Please Input" />
    <VInput placeholder="Please Input" class="[m]" />
    <VInput placeholder="Please Input" class="[l]" />

    <div class="sf-input-group [B]">
      <ins>https://</ins>
      <VInput placeholder="Please Input" />
      <ins>.com</ins>
    </div>
  </div>
</template>

<style scoped></style>
