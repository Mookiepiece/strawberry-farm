<script setup lang="ts">
import { ref, watchEffect } from 'vue';
</script>

<template>
  <div role="radiogroup" aria-label="TODO">
    <div role="radio" aria-checked="false">description</div>
  </div>
</template>

<style scoped>

:where(.my-radio:focus-visible + div, .my-radio:not(:disabled) + div:hover) {
  background: #8884;
}

:where(.my-radio:checked + div) {
  background:  #8888;
}
</style>
