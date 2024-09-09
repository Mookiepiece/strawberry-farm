<script setup lang="ts">
import { ref } from 'vue';
import ListboxRadios from './ListboxRadios.vue';

const model = ref<any>(null);
</script>

<template>
  <ListboxRadios v-model="model" :options="[1, 2, 3]" />
</template>
