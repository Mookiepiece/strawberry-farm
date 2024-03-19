<script setup lang="ts">
import { StyleValue, computed, ref } from 'vue';
import { CommonChoice } from './Form';

const model = defineModel<any>();

const props = withDefaults(
  defineProps<{
    options: CommonChoice[];
    disabled?: boolean;
    class?: any;
    style?: StyleValue;
    type?: 'submit' | 'reset' | 'button';
  }>(),
  {
    type: 'button',
  },
);

const options = computed(() =>
  props.options.map(o => ({
    label: typeof o === 'object' && o ? o.label ?? o.value : '' + o,
    value: typeof o === 'object' && o ? o.value : o,
    disabled: typeof o === 'object' && o ? o.disabled : false,
  })),
);

const anchored = computed(() =>
  options.value.map((o, index) => ({ ...o, index })),
);

const trap = computed(() => {
  let i = options.value.findIndex(i => i.value === model.value && !i.disabled);
  if (i === -1) return options.value.findIndex(i => !i.disabled);
  return i;
});

const onChange = (value: any) => {
  if (value !== model.value) model.value = value;
};

const el = ref<HTMLDivElement | null>(null);

const prev = () => {
  const before = anchored.value.slice(0, trap.value);
  const after = anchored.value.slice(trap.value + 1);
  const index = [...after, ...before].findLast(o => !o.disabled)?.index;

  if (typeof index === 'number') {
    model.value = options.value[index].value;
    (
      el.value?.querySelectorAll('[role="radio"]')[index] as HTMLDivElement
    ).focus();
  }
};

const next = () => {
  const before = anchored.value.slice(0, trap.value);
  const after = anchored.value.slice(trap.value + 1);
  const index = [...after, ...before].find(o => !o.disabled)?.index;

  if (typeof index === 'number') {
    model.value = options.value[index].value;
    (
      el.value?.querySelectorAll('[role="radio"]')[index] as HTMLDivElement
    ).focus();
  }
};

const onKeyDownExact = (e: KeyboardEvent) => {
  if (!(e.target instanceof Element)) return;
  if (!e.target.matches('[role="radio"]')) return;

  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      prev();
      break;
    case 'ArrowDown':
    case 'ArrowRight':
      next();
      break;
    case 'Enter':
      (
        el.value!.closest('form, [role="form"]') as { submit?: () => void }
      )?.submit?.();
      break;
  }
};
</script>

<template>
  <div
    class="sf-radio-group"
    :style="props.style"
    :class="props.class"
    role="radiogroup"
    ref="el"
    @keydown.exact="onKeyDownExact"
  >
    <div
      v-for="(o, index) in options"
      :key="o.value"
      role="radio"
      :aria-checked="o.value === model"
      :aria-disabled="props.disabled || o.disabled"
      :tabindex="index === trap ? 0 : -1"
      @focus="index === trap ? onChange(o.value) : undefined"
      @click="!o.disabled ? onChange(o.value) : undefined"
    >
      {{ o.label }}
    </div>
  </div>
</template>
