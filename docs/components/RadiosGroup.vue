<script setup lang="ts">
import { ref } from 'vue';
import { VRadios } from '@mookiepiece/strawberry-farm';

const model = ref(['three']);
const options = [
  {
    title: 'Colors',
    options: ['red', 'blue', 'green', 'yellow', 'purple'],
  },
  {
    title: 'Numbers',
    options: ['one', 'two', 'three', 'four', 'five'],
  },
];
</script>

<template>
  <VRadios v-model="model" :options />
</template>
