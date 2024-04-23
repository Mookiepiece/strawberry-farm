<script setup lang="ts" generic="T">
import { provide } from 'vue';
import { FormModel, V_FORM_IN } from './Form';

const props = defineProps<{
  form: FormModel<T>;
}>();

provide(V_FORM_IN, props.form);

</script>

<template>
  <form class="VForm" @submit.prevent="props.form.submit()">
    <slot />
  </form>
</template>
