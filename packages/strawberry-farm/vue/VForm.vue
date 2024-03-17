<script setup lang="ts">
import { computed, ref } from 'vue';
import { FormModel } from './Form';

const props = defineProps<{
  form: FormModel<any>;
}>();

</script>

<template>
  <form class="sf-form" @submit.prevent="props.form.submit()">
    <slot />
  </form>
</template>

<style>
.sf-form {
  height: 100%;
}
</style>
