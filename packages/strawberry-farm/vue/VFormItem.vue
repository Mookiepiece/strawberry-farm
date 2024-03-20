<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { Form, FormModel } from './Form';
import { validate } from '../functions/validator';

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
    validateSelf().then(v => (z.value = v));
    Form.pathValueSetter(form.value, descriptor.name, value);
  },
});

const z = ref<string | undefined>('');

const validateSelf = async () => {
  const value = model.value;
  const rules = descriptor.rules;
  const label = descriptor.label;
  if (rules) {
    let ans: void | string;
    for (const rule of rules) {
      ans = await validate(value, rule, label);
      if (ans) {
        return ans;
      }
    }
  }
};

const control = ref<any>();

const fieldProps = descriptor.props;
</script>

<template>
  <div class="sf-form-item">
    <label @click="control?.focus()">{{ descriptor.label }}</label>
    <slot>
      <component ref="control" :is="as" v-model="model" v-bind="fieldProps" />
    </slot>
    <div class="__alert tone:reimu" v-if="z">
      <i-feather i="x-octagon" />
      <div class="__message">{{ z }}</div>
    </div>
  </div>
</template>
