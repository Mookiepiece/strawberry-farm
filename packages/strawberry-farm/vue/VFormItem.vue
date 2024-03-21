<script setup lang="ts">
import { WritableComputedRef, computed, inject, ref } from 'vue';
import { Form, FormModel } from './Form';
import { validate } from '../functions/validator';
import { Bag } from '../functions';
import { unref } from 'vue';
import { reactive } from 'vue';

const props = defineProps<{
  name: string;
}>();

const slots = defineSlots<{
  default(props: {
    props: any;
    onBlur(): void;
    model: WritableComputedRef<any>;
  }): any;
}>();

const form: FormModel<any> = inject('VForm')!;

const descriptor = form.fields[props.name];

const as = Form.registry.get(descriptor.type || 'text');

const model = computed({
  get() {
    return Form.pathValueGetter(form.value, descriptor.name);
  },
  set(value: any) {
    validateSelf(Form.filterInputRules).then(v => (errorMessage.value = v));
    Form.pathValueSetter(form.value, descriptor.name, value);
  },
});

const errorMessage = ref<string | undefined>();

const bag = Bag();
const validateSelf = async (filter?: typeof Form.filterInputRules) => {
  bag();
  const signal = bag(new AbortController()).signal;

  const value = model.value;
  const rules = descriptor.rules;
  const label = descriptor.label;
  if (rules) {
    let ans: void | string;
    for (const rule of rules) {
      if (filter?.(rule) === false) continue;
      ans = await validate(value, rule, label);
      if (signal.aborted) throw new DOMException('', 'AbortError');
      if (ans) {
        return ans;
      }
    }
  }
};

const onBlur = () => {
  validateSelf(Form.filterBlurRules).then(v => (errorMessage.value = v));
};

const control = ref<any>();

const fieldProps = computed(() => unref(descriptor.props));
</script>

<template>
  <div class="sf-form-item">
    <label @click="control?.focus()">{{ descriptor.label }}</label>
    <slot :props="fieldProps" :model="model" :onBlur="onBlur">
      <component
        ref="control"
        :is="as"
        v-model="model"
        v-bind="fieldProps"
        @blur="onBlur"
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
    <div class="__alert tone:reimu" v-if="errorMessage">
      <i-feather i="x-octagon" />
      <div class="__message">{{ errorMessage }}</div>
    </div>
  </div>
</template>
