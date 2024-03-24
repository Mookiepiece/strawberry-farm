<script setup lang="ts">
import VCheckboxGroup from '@mookiepiece/strawberry-farm/vue/VCheckboxGroup.vue';
import { ref } from 'vue';

const v = ref([]);

const options = ['Yes', 'No', { value: "I'm not sure", disabled: true }];
</script>

<template>
  <VCheckboxGroup v-model="v" :options="options" />
</template>
