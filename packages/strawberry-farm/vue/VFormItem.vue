<script setup lang="ts">
import {
  WritableComputedRef,
  computed,
  inject,
  onBeforeMount,
  ref,
} from 'vue';
import { Form, FormModel } from './Form';
import { validate } from '../functions/validator';
import { Bag } from '../functions';
import { unref } from 'vue';

const props = defineProps<{
  name: string;
}>();

const slots = defineSlots<{
  default(props: { props: any; model: WritableComputedRef<any> }): any;
  subtitle: any;
  description: any;
  alert: any;
}>();

const id = Form.uuid();

const form: FormModel<any> = inject('VForm')!;

const descriptor = form.descriptors[props.name];

const as = Form.registry.get(descriptor.type || 'text');
const fieldProps = computed(() => unref(descriptor.props));

const model = computed({
  get() {
    return Form.pathValueGetter(form.value, descriptor.name);
  },
  set(value: any) {
    Form.pathValueSetter(form.value, descriptor.name, value);
    validateSelf().then(v => (message.value = v));
  },
});

const message = ref<string | undefined>();

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
      if (typeof ans === 'string') {
        return ans;
      }
    }
  }
};

const control = ref<any>();

const focus = () => {
  if (control.value.el instanceof HTMLElement) {
    control.value.el.focus?.(); // Strawberry Farm Vue Component exposes `el`.
  } else if (control.value.$el instanceof HTMLElement) {
    control.value.$el.focus?.(); // Vue Component which has root node
  } else {
    control.value.focus?.(); // Native HTML Elements
  }
};

form.items[props.name] = {
  focus,
};

onBeforeMount(() => {
  delete form.items[props.name];
});
</script>

<template>
  <div class="VFormItem" :class="{ invalid: typeof message === 'string' }">
    <div class="VFormItemHeader" v-if="descriptor.label">
      <div class="VFormItemLabel" :id="id" @click="focus">
        {{ descriptor.label }}
      </div>

      <div v-if="$slots.subtitle" class="f3">
        <slot name="subtitle" />
      </div>
    </div>

    <slot :props="fieldProps" :model="model">
      <component
        :name="descriptor.name"
        ref="control"
        :is="as"
        v-model="model"
        v-bind="fieldProps"
        :aria-labelledby="descriptor.label ? id : undefined"
      />
    </slot>

    <div v-if="$slots.description" class="f3">
      <slot name="description" />
    </div>

    <div v-if="$slots.alert">
      <slot v-if="message" name="alert" />
    </div>
    <div v-else-if="message" class="[B] f2 tone:reimu Alert">
      <i-feather i="x-octagon" />
      <div class="px-1">{{ message }}</div>
    </div>
  </div>
</template>
