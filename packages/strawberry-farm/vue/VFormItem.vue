<script setup lang="ts">
import { inject, ref } from 'vue';
import { FormModel } from './Form';

const props = defineProps<{
  name: string;
}>();

const form: FormModel<any> = inject('VForm')!;

// form.fields.

const v = ref();
</script>

<template>
  <label>
    <span> if this work </span>
  </label>
  <VRadioGroup v-model="v" :options="[1, 2, 3, 4, 5]" />
</template>
