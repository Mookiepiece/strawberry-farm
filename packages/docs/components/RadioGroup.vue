<script setup lang="ts">
import VRadioGroup from '@mookiepiece/strawberry-farm/vue/VRadioGroup.vue';
import { ref } from 'vue';

const v = ref();

const options = ['Yes', 'No', { value: "I'm not sure", disabled: true }];
</script>

<template>
  <VRadioGroup v-model="v" :options="options" />
</template>
