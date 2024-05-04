<script setup lang="ts">
import { StyleValue, computed, h, ref, watch } from 'vue';
import {
  CommonOptionGroup,
  CommonOptionInput,
  CommonOptionsInput,
  NormalizedCommonOption,
} from './misc';
import { wai } from '../functions';

const model = defineModel<any>();

const props = defineProps<{
  /**
   *  - 'clearable' Single option, select the same option will unselect it.
   *  - 'cursor' Single option, select current option when navigating, this is to simulate `<input type="radio"/>` behaviour
   *  - 'multi' Multiselectable, model must be an array.
   */
  mode?: 'clearable' | 'cursor' | 'multi';
  /**
   * Pointer move events will change current option
   */
  powerPointer?: boolean;
  options?: CommonOptionsInput;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
}>();

const slots = defineSlots<{
  default?(props: { option: NormalizedCommonOption }): any;
  title?(props: { group: CommonOptionGroup }): any;
}>();
const id = wai();

const tree = computed(() => {
  let _index = 0;

  const normalize = (o: CommonOptionInput): NormalizedCommonOption => {
    const value = typeof o === 'object' && o ? o.value : o;
    const index = _index++;

    return {
      label: typeof o === 'object' && o ? o.label ?? o.value : '' + o,
      value,
      disabled: typeof o === 'object' && o ? o.disabled || false : false,
      index,
      selected: multi.value
        ? model.value?.includes(value)
        : value === model.value,
      current: current.value === index,
    };
  };

  return (props.options ?? []).map(i => {
    if (i && typeof i === 'object' && 'options' in i)
      return {
        ...i,
        options: i.options.map(normalize),
      };
    return normalize(i);
  });
});

const choices = computed(() =>
  tree.value.flatMap(i =>
    i && typeof i === 'object' && 'options' in i ? i.options : i,
  ),
);

const current = ref(-1);

const currentValid = computed(
  () => current.value >= 0 && current.value < choices.value.length,
);

const clearable = computed(() => props.mode === 'clearable');
const multi = computed(() => props.mode === 'multi');
const cursor = computed(() => props.mode === 'cursor');

const checkCursorOnFocus = () => {
  if (!currentValid.value) {
    current.value = choices.value.findIndex(
      i =>
        i.value ===
        (multi.value ? model.value?.includes(i.value) : model.value),
    );

    if (current.value === -1 && choices.value.length) current.value = 0;
  }
};

const toggle = (value: any) => {
  if (multi.value) {
    const set = new Set(model.value);
    set.has(value) ? set.delete(value) : set.add(value);
    model.value = [...set];
    return;
  }

  if (clearable.value && model.value === value) model.value = null;
  else model.value = value;
};

const el = ref<HTMLDivElement | null>(null);

const io = new IntersectionObserver(enteries => {
  if ((enteries[0].intersectionRatio || 0) < 1) {
    enteries[0].target.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }
  io.disconnect();
});

const nav = (delta: -1 | 1) => {
  const before = choices.value.slice(0, current.value);
  const after = choices.value.slice(current.value + 1);

  const option = [...after, ...before][delta < 0 ? 'findLast' : 'find'](
    o => !o.disabled,
  );

  if (option) {
    const index = choices.value.indexOf(option);
    current.value = index;

    io.disconnect();
    io.observe(document.getElementById(id + current.value)!);

    if (cursor.value) toggle(option.value);

    return index;
  }
  return -1;
};

const toggleCurrent = () => {
  if (currentValid.value) toggle(choices.value[current.value].value);
};

const onKeyDownExact = (e: KeyboardEvent) => {
  if (props.disabled) return;

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
    case 'Enter':
      e.preventDefault();
      toggleCurrent();
      break;
  }
};

defineExpose({
  el,
});

const renderOption = (i: NormalizedCommonOption) =>
  h(
    'div',
    {
      id: id + i.index,
      onClick: !i.disabled ? () => toggle(i.value) : undefined,
      role: 'option',
      'aria-selected': i.selected || undefined,
      'aria-current': i.current || undefined,
      onPointermove: props.powerPointer
        ? () => void (current.value = i.index)
        : undefined,
      'aria-disabled': props.disabled || i.disabled || undefined,
    },
    slots.default?.({ option: i }) || i.label,
  );
</script>

<template>
  <div
    ref="el"
    :id="id"
    :style="props.style"
    :class="props.class"
    @focus="checkCursorOnFocus"
    @keydown.self.exact="onKeyDownExact"
    role="listbox"
    :tabindex="props.disabled ? -1 : 0"
    :aria-disabled="props.disabled"
    :aria-activedescendant="currentValid ? id + current : undefined"
    :aria-multiselectable="multi"
  >
    <template
      v-for="g in tree"
      :key="
        g && typeof g === 'object' && 'options' in g
          ? 'g' + g.label
          : 'i' + g.value
      "
    >
      <div
        role="group"
        :aria-label="g.label"
        v-if="g && typeof g === 'object' && 'options' in g"
      >
        <div role="none">
          <slot name="title" :group="g">{{ g.label }}</slot>
        </div>
        <component
          v-for="i in g.options"
          :key="i.index"
          :is="renderOption(i)"
        />
      </div>
      <component v-else :is="renderOption(g)" />
    </template>
  </div>
</template>
