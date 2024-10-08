<script setup lang="ts">
import { VSelect } from '@mookiepiece/strawberry-farm';

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
  <VSelect :options />
</template>
