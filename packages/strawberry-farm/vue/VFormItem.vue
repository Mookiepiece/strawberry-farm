<script setup lang="ts">
import { WritableComputedRef, computed, inject, ref } from 'vue';
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

const descriptor = form.fields[props.name];

const as = Form.registry.get(descriptor.type || 'text');

const model = computed({
  get() {
    return Form.pathValueGetter(form.value, descriptor.name);
  },
  set(value: any) {
    Form.pathValueSetter(form.value, descriptor.name, value);
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
  <div class="FormItem">
    <div class="FormItemHeader" v-if="descriptor.label">
      <div
        class="FormItemTitle"
        :id="id"
        @click="control?.focus()"
        aria-hidden="true"
      >
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
        :aria-labelledby="id"
      />
    </slot>

    <div v-if="$slots.description" class="f3">
      <slot name="description" />
    </div>

    <div v-if="$slots.alert">
      <slot v-if="errorMessage" name="alert" />
    </div>
    <div v-else-if="errorMessage" class="[B] f2 tone:reimu Alert">
      <i-feather i="x-octagon" />
      <div class="px-1">{{ errorMessage }}</div>
    </div>
  </div>
</template>
