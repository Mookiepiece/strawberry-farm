<script setup lang="ts">
import { StyleValue, computed, ref } from 'vue';

// TODO: get out
type CommonChoice =
  | string
  | number
  | boolean
  | null
  | undefined
  | {
      label: string;
      value: any;
      disabled?: boolean;
    };

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
    label: typeof o === 'object' && o ? o.label : '' + o,
    value: typeof o === 'object' && o ? o.value : o,
    disabled: typeof o === 'object' && o ? o.disabled : false,
  })),
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
  if (trap.value === -1) return; // didn't happen
  const index = options.value
    .slice(0, trap.value)
    .findLastIndex(o => !o.disabled);
  if (index !== -1) {
    model.value = options.value[index].value;
    ([...el.value!.children][index] as HTMLDivElement).focus();
  }
};

const next = () => {
  if (trap.value === -1) return; // didn't happen

  const index = options.value.findIndex(
    (o, i) => i > trap.value && !o.disabled,
  );
  if (index !== -1) {
    model.value = options.value[index].value;
    ([...el.value!.children][index] as HTMLDivElement).focus();
  }
};

const onKeyDownExact = (e: KeyboardEvent) => {
  if ((e.target as HTMLDivElement).parentElement !== el.value) return;

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
      class="sf-radio"
      role="radio"
      :aria-checked="o.value === model"
      :aria-disabled="props.disabled"
      :tabindex="index === trap ? 0 : -1"
      @focus="index === trap ? onChange(o.value) : undefined"
      @click="!o.disabled ? onChange(o.value) : undefined"
    >
      {{ o.label }}
    </div>
  </div>
</template>

<style>
.sf-radio-group {
  border: 2px solid var(--mat-solid-15);
}

.sf-radio {
  --mat-shadow: 0 0 0 0 transparent;
  transition: box-shadow 0.2s;

  padding: 10px;

  &:not([aira-disabled='true']):hover {
    background-color: var(--mat-solid-1);
  }

  &[aria-checked='true'] {
    outline: 2px solid var(---main);
    outline-offset: -1px;
  }

  &:focus-visible {
    outline: 2px solid var(---main);
    outline-offset: -1px;
    box-shadow: 0 0 0 6px var(---foam);
  }
}
</style>
