<script setup lang="ts">
import { StyleValue, computed, ref, watch } from 'vue';
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
   *  - 'powerCursor' Single option, select current option when navigating, this is to simulate `<input type="radio"/>` behaviour
   *  - 'multi' Multiselectable, model must be an array.
   */
  mode?: 'clearable' | 'powerCursor' | 'multi';
  /**
   * Pointer move events will change current option
   */
  powerPointer?: boolean;
  /**
   *  **The same value is assigned to the model** when click, which can trigger model change and thus close dropdown in `<Select />`.
   *
   *  Will have no effect when `mode='clearalbe'`.
   *
   *  Turn this off to simulate `<input type="radio"/>` behaviour, default is `false`.
   */
  assignSameValue?: boolean;
  /**
   * By default, arrow top left navigates to -1 and arrow right bottom navigates to 1.
   *
   * Use this if partical arrow keys are used for special actions e.g. cascade or tree select.
   */
  keydownAdvanced?: (e: KeyboardEvent) => boolean | void;
  options?: CommonOptionsInput;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
  itemClass?: any;
  itemStyle?: StyleValue;
}>();

defineSlots<{
  default(props: { option: NormalizedCommonOption }): any;
  groupLabel(props: { group: CommonOptionGroup }): any;
}>();
const id = wai();

const groupOrOptions = computed(() => {
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
        ? model.value.includes(value)
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

// What's going wrong with my eslint plugin vue?
// eslint-disable-next-line vue/no-dupe-keys
const options = computed(() =>
  groupOrOptions.value.flatMap(i =>
    i && typeof i === 'object' && 'options' in i ? i.options : i,
  ),
);

const current = ref(-1);

const currentValid = computed(
  () => current.value >= 0 && current.value < options.value.length,
);

const clearable = computed(() => props.mode === 'clearable');
const multi = computed(() => props.mode === 'multi');
const powerCursor = computed(() => props.mode === 'powerCursor');

const checkCursorOnFocus = () => {
  if (!currentValid.value) {
    current.value = options.value.findIndex(
      i =>
        i.value ===
        (multi.value ? (model.value as any[]).includes(i.value) : model.value),
    );

    if (current.value === -1 && options.value.length) current.value = 0;
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
  else if (model.value !== value || props.assignSameValue) model.value = value;
};

const invalid = computed(() =>
  Array.isArray(model.value)
    ? model.value.filter(i => !options.value.some(o => o.value === i))
    : !options.value.some(o => o.value === model.value) && model.value != null
      ? [model.value]
      : [],
);

watch(invalid, invalid => {
  if (invalid.length) invalid.forEach(i => toggle(i));
});

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

    document.getElementById(id + current.value)?.scrollIntoView();

    if (powerCursor.value) toggle(option.value);

    return index;
  }
  return -1;
};

const toggleCurrent = () => {
  if (currentValid.value) toggle(options.value[current.value].value);
};

const onKeyDownExact = (e: KeyboardEvent) => {
  if (props.disabled) return;

  if (props.keydownAdvanced?.(e)) return;

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
      v-for="g in groupOrOptions"
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
        <div role="none" v-if="$slots.groupLabel">
          <slot name="groupLabel" :group="g">{{ g.label }}</slot>
        </div>
        <!--
          This two role="option" <div/>s are duplicated,
          I don't make them components here because
          I don't want to introduce new tree node in Vue devtool.
        -->
        <div
          v-for="i in g.options"
          :key="i.value"
          :id="id + i.index"
          @click="!i.disabled ? toggle(i.value) : undefined"
          role="option"
          :aria-selected="i.selected || undefined"
          :aria-current="i.current || undefined"
          @pointermove="props.powerPointer ? (current = i.index) : undefined"
          :aria-disabled="props.disabled || i.disabled || undefined"
        >
          <slot :option="i">
            {{ i.label }}
          </slot>
        </div>
      </div>
      <template v-else>
        <div
          :id="id + g.index"
          @click="!g.disabled ? toggle(g.value) : undefined"
          role="option"
          @pointermove="props.powerPointer ? (current = g.index) : undefined"
          :aria-selected="g.selected || undefined"
          :aria-current="g.current || undefined"
          :aria-disabled="props.disabled || g.disabled || undefined"
        >
          <slot :option="g">
            {{ g.label }}
          </slot>
        </div>
      </template>
    </template>
  </div>
</template>
