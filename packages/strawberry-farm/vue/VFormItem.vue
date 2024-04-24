<script setup lang="ts">
import {
  WritableComputedRef,
  cloneVNode,
  computed,
  h,
  inject,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue';
import { Form, FormModel, V_FORM_IN, V_FORM_ITEM_LABEL_IN } from './Form';
import { validate } from '../functions/validator';
import { Bag } from '../functions';
import { unref } from 'vue';
import VFormLabel from './VFormLabel.vue';
import VInput from './VInput.vue';

const props = defineProps<{
  name?: string;
}>();

const slots = defineSlots<{
  default(props: { i: { model: any } }): any;
  title: any;
  description: any;
  alert(props: { message: string }): any;
}>();

const form: FormModel<any> = inject(V_FORM_IN)!;
const id = Form.inc();
const descriptor = computed(() =>
  props.name ? form._h(props.name) : undefined,
);

provide(V_FORM_ITEM_LABEL_IN, { id, label: descriptor.value?.label });

const control = computed(() => {
  let rules = unref(descriptor.value?.rules);
  return { rules };
});

const visible = computed(() => descriptor.value?.visible?.value !== false);

const model = computed({
  get() {
    if (!props.name) return;
    return Form.getter(form.value, props.name);
  },
  set(value: any) {
    if (!props.name) return;
    Form.setter(form.value, props.name, value);
    validateLocked().then(v => (state.message = v));
  },
});

const i = reactive({ model });

const _validate = async () => {
  const value = model.value;
  const rules = control.value.rules;
  const label = descriptor.value?.label;
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

const state = reactive<
  NonNullable<(typeof form.items)[keyof typeof form.items]>
>({
  focus,
  validate: () => {
    bag();
    return _validate();
  },
  _visible: visible.value,
  message: undefined,
});
watch(visible, v => (state._visible = v), { immediate: true });

watchEffect(onCleanup => {
  const name = props.name;
  if (!name || !descriptor.value) return;
  form.items[name] = state;
  onCleanup(() => delete form.items[name]);
});

const message = computed(() => state.message);

const vn = computed(() =>
  cloneVNode(unref(descriptor.value?.render)?.() ?? h(VInput), {
    modelValue: model.value,
    'onUpdate:modelValue': (v: any) => {
      model.value = v;
    },
  }),
);
</script>

<template>
  <div
    class="VFormItem"
    :class="{ invalid: typeof message === 'string' }"
    v-if="name && descriptor && visible"
  >
    <div class="VFormItemTitle">
      <slot name="title">
        <VFormLabel />
      </slot>
    </div>

    <slot :i="i">
      <component :name="name" ref="input" :is="vn" />
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
