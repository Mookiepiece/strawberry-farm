<script setup lang="ts">
import { FormModel } from './Form';

const props = defineProps<{
  form: FormModel<any>;
}>();

</script>

<template>
  <form class="VForm" @submit.prevent="props.form.submit()">
    <slot />
  </form>
</template>
