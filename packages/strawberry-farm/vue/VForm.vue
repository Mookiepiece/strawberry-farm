<script setup lang="ts" generic="T">
import { provide } from 'vue';
import { FormModel, Path } from './Form';

const props = defineProps<{
  form: FormModel<T>;
}>();

provide('VForm', props.form);

</script>

<template>
  <form class="VForm" @submit.prevent="props.form.submit()">
    <slot />
  </form>
</template>
