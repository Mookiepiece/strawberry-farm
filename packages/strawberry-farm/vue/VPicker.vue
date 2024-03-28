<script setup lang="ts">
import { StyleValue, computed, ref } from 'vue';
import { CommonChoice } from './misc';
import { wai } from '../functions';

const model = defineModel<any>();

const props = defineProps<{
  multi?: boolean;
  options?: CommonChoice[];
  clearable?: boolean;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
  itemClass?: any;
  itemStyle?: StyleValue;
}>();

defineSlots<{
  default(props: {
    option: {
      label: any;
      value: any;
      disabled: boolean | undefined;
      index: number;
    };
  }): any;
}>();

const id = wai();

const options = computed(() =>
  (props.options ?? []).map((o, index) => ({
    label: typeof o === 'object' && o ? o.label ?? o.value : '' + o,
    value: typeof o === 'object' && o ? o.value : o,
    disabled: typeof o === 'object' && o ? o.disabled : false,
    index,
  })),
);

const current = ref(-1);

const onFocus = () => {
  if (current.value < 0 || current.value >= options.value.length) {
    current.value = options.value.findIndex(
      i => i.value === model.value && !i.disabled,
    );

    if (current.value === -1)
      current.value = options.value.findIndex(o => !o.disabled);

    if (current.value !== -1) {
      if (!props.multi && !props.clearable)
        toggle(options.value[current.value].value);
    }
  }
};

const toggle = (value: any) => {
  if (props.multi) {
    const set = new Set(model.value);
    set.has(value) ? set.delete(value) : set.add(value);
    model.value = [...set];
    return;
  }

  if (value !== model.value) model.value = value;
  else if (props.clearable) model.value = null;
};

const el = ref<HTMLDivElement | null>(null);

const nav = (delta: -1 | 1) => {
  const before = options.value.slice(0, current.value);
  const after = options.value.slice(current.value + 1);

  const option = [...after, ...before][delta < 0 ? 'findLast' : 'find'](
    o => !o.disabled,
  );

  if (option) {
    const index = options.value.indexOf(option);
    current.value = index;

    if (!props.multi && !props.clearable) toggle(option.value);

    return index;
  }
  return -1;
};

const onKeyDownExact = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault();
      nav(-1);
      break;
    case 'ArrowDown':
    case 'ArrowRight':
      e.preventDefault();
      nav(1);
      break;
    case ' ':
      e.preventDefault();
      if (current.value < 0 || current.value >= options.value.length) return;
      toggle(options.value[current.value].value);
      break;
    case 'Enter':
      e.preventDefault();
      (
        el.value!.closest('form, [role="form"]') as { submit?: () => void }
      )?.submit?.();
      break;
  }
};

defineExpose({
  el,
});
</script>

<template>
  <div
    ref="el"
    :id="id"
    :style="props.style"
    :class="props.class"
    @focus="onFocus"
    @keydown.self.exact="onKeyDownExact"
    role="listbox"
    :tabindex="props.disabled ? -1 : 0"
    :aira-disabled="props.disabled"
    :aria-activedescendant="current === -1 ? '' : id + current"
    :aria-multiselectable="props.multi"
  >
    <div
      v-for="(o, index) in options"
      :key="o.value"
      :id="id + index"
      @click="!o.disabled ? toggle(o.value) : undefined"
      role="option"
      :aria-selected="props.multi ? model.includes(o.value) : o.value === model"
      :aria-current="index === current || undefined"
      :aria-disabled="props.disabled || o.disabled || undefined"
    >
      <slot :option="o">
        {{ o.label }}
      </slot>
    </div>
  </div>
</template>
