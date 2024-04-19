<script setup lang="ts">
import {
  WritableComputedRef,
  computed,
  inject,
  provide,
  ref,
  watchEffect,
} from 'vue';
import { Form, FormModel } from './Form';
import { validate } from '../functions/validator';
import { Bag } from '../functions';
import { unref } from 'vue';
import VFormLabel from './VFormLabel.vue';

const props = defineProps<{
  name?: string;
}>();

const slots = defineSlots<{
  default(props: { props: any; model: WritableComputedRef<any> }): any;
  title: any;
  description: any;
  alert(props: { message: string }): any;
}>();

const form: FormModel<any> = inject('VForm')!;
const id = Form.uuid();
const descriptor = props.name ? form.d(props.name) : undefined;

provide('VFormItemLabel', { id, label: descriptor?.label });

const control = computed(() => {
  let _type = unref(descriptor?.type);
  const [type, props] = Array.isArray(_type) ? _type : [_type || 'text'];
  return { type, props };
});

const as = computed(() => Form.registry.get(control.value.type));

const model = computed({
  get() {
    if (!props.name) return;
    return Form.pathValueGetter(form.value, props.name);
  },
  set(value: any) {
    if (!props.name) return;
    Form.pathValueSetter(form.value, props.name, value);
    validateLocked().then(v => (message.value = v));
  },
});

const message = ref<string | undefined>();

const _validate = async () => {
  const value = model.value;
  const rules = descriptor?.rules;
  const label = descriptor?.label;
  if (rules) {
    let ans: void | string;
    for (const rule of rules) {
      ans = await validate(value, rule, label);
      if (typeof ans === 'string') {
        return ans;
      }
    }
  }
};

const bag = Bag();
const validateLocked = async () => {
  bag();
  const signal = bag(new AbortController()).signal;
  const ans = await _validate();
  if (signal.aborted) return new Promise<never>(() => Infinity);
  return ans;
};

const input = ref<any>();
const focus = () =>
  (input.value.el ?? input.value.$el ?? input.value)?.focus?.();

watchEffect(onCleanup => {
  const name = props.name;
  if (!name || !descriptor) return;
  form.items[name] = {
    focus,
    reset() {},
    descriptor,
    validate: _validate,
    message,
  };
  onCleanup(() => delete form.items[name]);
});
</script>

<template>
  <div
    class="VFormItem"
    :class="{ invalid: typeof message === 'string' }"
    v-if="name && descriptor"
  >
    <slot name="title">
      <VFormLabel />
    </slot>

    <slot :props="control.props" :model="model">
      <component
        :name="name"
        ref="input"
        :is="as"
        v-model="model"
        v-bind="control.props"
        :id="id"
      />
    </slot>

    <div v-if="$slots.description" class="f3">
      <slot name="description" />
    </div>

    <div v-if="$slots.alert">
      <slot v-if="message" name="alert" :message="message" />
    </div>
    <div v-else-if="message" class="[B] f2 tone:reimu Alert">
      <i-feather i="x-octagon" />
      <div class="px-1">{{ message }}</div>
    </div>
  </div>
</template>
