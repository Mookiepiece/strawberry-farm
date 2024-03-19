<script setup lang="ts">
import { computed, inject } from 'vue';
import { Form, FormModel } from './Form';

const props = defineProps<{
  name: string;
}>();

const form: FormModel<any> = inject('VForm')!;

const descriptor = form.fields[props.name];

const as = Form.registry.get(descriptor.type);

const model = computed({
  get() {
    return Form.pathValueGetter(form.value, descriptor.name);
  },
  set(value: any) {
    Form.pathValueSetter(form.value, descriptor.name, value);
  },
});

</script>

<template>
  <label>{{ descriptor.label }}</label>
  <slot>
    <component :is="as" v-model="model" />
  </slot>
</template>
