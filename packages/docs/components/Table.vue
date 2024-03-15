<script setup lang="ts">
import VTable from '@mookiepiece/strawberry-farm/vue/VTable.vue';
import { ref } from 'vue';

const v = ref();
</script>

<template>
  <VTable v-model="v" :options="[1, 2, 3, 4, 5]" />
</template>
