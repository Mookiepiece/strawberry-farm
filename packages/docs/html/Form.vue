<script setup lang="ts">
import VInput from '@mookiepiece/strawberry-farm/vue/VInput.vue';
import { ref } from 'vue';

const model = ref('');
</script>

<template>
  <div class="[A]" style="gap: 10px">
    <VInput v-model="model" placeholder="Please Input" class="[s]" />
    <VInput v-model="model" placeholder="Please Input" />
    <VInput v-model="model" placeholder="Please Input" class="[l]" />

    <VInput v-model="model" textarea placeholder="Please Input" />


    <div class="InputGroup [s]">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="Please Input" />
      <ins>.com</ins>
    </div>
    <div class="InputGroup">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="Please Input" />
      <ins>.com</ins>
    </div>
    <div class="InputGroup [l]">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="Please Input" />
      <ins>.com</ins>
    </div>
  </div>
</template>

<style scoped></style>
