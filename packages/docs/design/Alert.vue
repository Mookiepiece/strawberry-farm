<script setup lang="ts">
import { ref } from 'vue';

const a = ref<HTMLDivElement>();
const b = ref<HTMLDivElement>();
</script>

<template>
  <div class="Alert f2">
    <i-feather i="x" class="f1" />
    <div class="px-1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis sit
      architecto vero quia explicabo debitis assumenda veniam, unde cum sed, at
      voluptates velit, sunt voluptas pariatur culpa quaerat dolor repellendus!
    </div>
  </div>
</template>

<style scoped></style>
