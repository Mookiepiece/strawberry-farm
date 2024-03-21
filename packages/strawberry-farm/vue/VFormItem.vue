<script setup lang="ts">
import { WritableComputedRef, computed, inject, ref } from 'vue';
import { Form, FormModel } from './Form';
import { validate } from '../functions/validator';
import { Bag } from '../functions';
import { unref } from 'vue';

const props = defineProps<{
  name: string;
}>();

const emit = defineEmits<{
  input: [any];
  blur: [];
}>();

const slots = defineSlots<{
  default(props: { props: any; model: WritableComputedRef<any> }): any;
}>();

const form: FormModel<any> = inject('VForm')!;

const descriptor = form.fields[props.name];

const as = Form.registry.get(descriptor.type || 'text');

const model = computed({
  get() {
    return Form.pathValueGetter(form.value, descriptor.name);
  },
  set(value: any) {
    Form.pathValueSetter(form.value, descriptor.name, value);
    emit('input', value);
    validateSelf().then(v => (errorMessage.value = v));
  },
});

const errorMessage = ref<string | undefined>();

const bag = Bag();
const validateSelf = async () => {
  bag();
  const signal = bag(new AbortController()).signal;

  const value = model.value;
  const rules = descriptor.rules;
  const label = descriptor.label;
  if (rules) {
    let ans: void | string;
    for (const rule of rules) {
      ans = await validate(value, rule, label);
      if (signal.aborted) throw new DOMException('', 'AbortError');
      if (ans) {
        return ans;
      }
    }
  }
};

const control = ref<any>();

const fieldProps = computed(() => unref(descriptor.props));
</script>

<template>
  <div class="sf-form-item">
    <label @click="control?.focus()">{{ descriptor.label }}</label>
    <slot :props="fieldProps" :model="model">
      <component
        ref="control"
        :is="as"
        v-model="model"
        v-bind="fieldProps"
        @blur="emit('blur')"
      />
    </slot>
    <div class="__description">
      <i-feather i="info" />
      <div class="__message">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus
        voluptates sit ipsum eius aliquid deleniti qui dolores consectetur rem.
        Explicabo illum similique placeat debitis! Fuga nam veniam esse incidunt
        adipisci.
      </div>
    </div>
    <div class="Alert tone:reimu" v-if="errorMessage">
      <i-feather i="x-octagon" />
      <div class="Message">{{ errorMessage }}</div>
    </div>
  </div>
</template>
