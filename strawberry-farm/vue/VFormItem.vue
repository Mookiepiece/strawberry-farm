<script setup lang="ts">
import {
  cloneVNode,
  computed,
  h,
  inject,
  provide,
  reactive,
  watchEffect,
} from 'vue';
import { Form, FormModel, V_FORM_IN, V_FORM_ITEM_LABEL_IN } from './Form';
import { RuleSlim, validate } from '../shared/validator';
import { Bag } from '../shared';
import { unref } from 'vue';
import VFormLabel from './VFormLabel.vue';
import VInput from './VInput.vue';

const props = withDefaults(
  defineProps<{
    name?: string;
    label?: string;
    rules?: RuleSlim[];
    visible?: boolean;
  }>(),
  {
    visible: undefined,
  },
);

const slots = defineSlots<{
  default?(): any;
  title: any;
  extra: any;
  alert(props: { message: string }): any;
}>();

const form: FormModel<any> = inject(V_FORM_IN)!;
const id = Form.inc();
const descriptor = computed(() =>
  props.name ? form._h(props.name) : undefined,
);

const label = computed(() => unref(descriptor.value?.label) ?? props.label);

const rules = computed(() => [
  ...(unref(descriptor.value?.rules) ?? []),
  ...(props.rules ?? []),
]);

const asterisk = computed(
  () =>
    !!rules.value?.some(r => {
      if (typeof r === 'string') return r.endsWith('!');
      else if (Array.isArray(r)) return r[0].endsWith('!');
      else return r.required;
    }),
);

const visible = computed(() =>
  typeof props.visible === 'boolean'
    ? props.visible
    : descriptor.value?.visible?.value !== false,
);

provide(V_FORM_ITEM_LABEL_IN, reactive({ id, label, asterisk }));

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

const _validate = async () => {
  const value = model.value;
  const $rules = rules.value;
  const $label = label.value;
  if ($rules.length) {
    let ans: void | string;
    for (const rule of $rules) {
      ans = await validate(value, rule, $label);
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

const focus = () => document.getElementById(id)?.focus?.();

const state = reactive({
  focus,
  validate: () => {
    bag();
    return _validate();
  },
  _visible: visible,
  message: undefined as string | undefined,
});

watchEffect(onCleanup => {
  const name = props.name;
  if (!name || !descriptor.value) return;
  form.items[name] = state;
  onCleanup(() => delete form.items[name]);
});

const message = computed(() => state.message);

const render = () =>
  cloneVNode(
    slots.default?.()[0] ?? descriptor.value?.render?.() ?? h(VInput),
    {
      id,
      modelValue: model.value,
      'onUpdate:modelValue': (v: any) => {
        model.value = v;
      },
    },
  );
</script>

<template>
  <div
    class="VFormItem"
    :class="{ invalid: typeof message === 'string' }"
    v-if="name && visible"
  >
    <div class="VFormItemTitle">
      <slot name="title">
        <VFormLabel />
      </slot>
    </div>

    <component :is="render" />

    <div v-if="$slots.extra" class="f3">
      <slot name="extra" />
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
