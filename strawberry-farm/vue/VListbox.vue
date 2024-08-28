<script setup lang="ts" generic="T = undefined">
import { StyleValue, computed, h, ref } from 'vue';
import {
  CommonOptionGroup,
  CommonOptionInput,
  CommonOptionsInput,
  NormalizedCommonOption,
  flatCommonOptionsInput,
} from './misc';
import { wai } from '../shared';
import { RenderFunction } from './RenderFunction';

const model = defineModel<any>();

const props = defineProps<{
  /**
   * While in single option mode, select the same option will unselect it.
   */
  clearable?: boolean;
  /**
   * Keyboard navigation won't trigger updates
   */
  magnetic?: boolean;

  options?: CommonOptionsInput<T>;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
}>();

const slots = defineSlots<{
  default?(props: { option: NormalizedCommonOption<T> }): any;
  header?(props: { group: CommonOptionGroup<T> }): any;
}>();
const id = wai();

const _current = ref(0);
const current = computed({
  get() {
    const options = flatCommonOptionsInput(props.options ?? []);
    const available = options.some(i => !i.disabled);
    if (!available) return -1;
    if (_current.value >= 0 && _current.value < options.length)
      return _current.value;
    return 0;
  },
  set(v) {
    _current.value = v;
  },
});

const multi = computed(() => Array.isArray(model.value));

const tree = computed(() => {
  let _index = 0;

  const normalize = (o: CommonOptionInput<T>): NormalizedCommonOption<T> => {
    const value = typeof o === 'object' && o ? o.value : o;
    const index = _index++;

    return {
      label: typeof o === 'object' && o ? (o.label ?? o.value) : '' + o,
      value,
      meta: typeof o === 'object' && o ? o.meta : undefined,
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

const toggle = (value: any) => {
  if (multi.value) {
    if (!model.value) return;
    model.value.includes(value)
      ? model.value.splice(model.value.indexOf(value), 1)
      : model.value.push(value);
    model.value = model.value;
    return;
  }

  if (props.clearable && model.value === value) model.value = null;
  else model.value = value;
};

const el = ref<HTMLDivElement | null>(null);

const io = new IntersectionObserver(([entry]) => {
  if ((entry.intersectionRatio || 0) < 1) {
    entry.target.scrollIntoView({ block: 'center', inline: 'center' });
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
    current.value = choices.value.indexOf(option);

    io.disconnect();
    io.observe(document.getElementById(id + current.value)!);

    if (!multi.value && !props.magnetic) toggle(option.value);
  }
};

const toggleCurrent = () => {
  if (current.value > -1) toggle(choices.value[current.value].value);
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

const renderOption = (i: NormalizedCommonOption<T>) =>
  h(
    'div',
    {
      id: id + i.index,
      onClick: !i.disabled ? () => toggle(i.value) : undefined,
      role: 'option',
      'aria-selected': i.selected || undefined,
      'aria-current': i.current || undefined,
      onPointermove: props.magnetic
        ? () => !props.disabled && !i.disabled && (current.value = i.index)
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
    @keydown.self.exact="onKeyDownExact"
    role="listbox"
    :tabindex="props.disabled ? -1 : 0"
    :aria-disabled="props.disabled"
    :aria-activedescendant="current > -1 ? id + current : undefined"
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
        <slot name="header" :group="g">
          <h6>{{ g.label }}</h6>
        </slot>
        <RenderFunction
          v-for="i in g.options"
          :key="i.value"
          :render="() => renderOption(i)"
        />
      </div>
      <RenderFunction v-else :render="() => renderOption(g)" />
    </template>
  </div>
</template>
