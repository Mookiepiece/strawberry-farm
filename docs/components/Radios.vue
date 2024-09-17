<script setup lang="ts">
import { ref } from 'vue';
import { VRadios } from '@mookiepiece/strawberry-farm';

const model = ref(3);
</script>

<template>
  <VRadios v-model="model" :options="[1, 2, { value: 3, disabled: true }]" />
</template>
