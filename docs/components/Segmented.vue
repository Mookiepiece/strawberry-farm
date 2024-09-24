<script setup lang="ts">
import { ref } from 'vue';
import { VSegmented } from '@mookiepiece/strawberry-farm';

const model = ref('Grapes');
</script>

<template>
  <VSegmented
    v-model="model"
    :options="['Grapes', 'Melon', { value: 'Strawberry', disabled: true }]"
  />
</template>
