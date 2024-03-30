<script setup lang="ts">
import { StyleValue, computed, ref } from 'vue';
import { CommonOption, CommonOptionGroup } from './misc';
import { wai } from '../functions';
import { h } from 'vue';

const model = defineModel<any>();

const props = defineProps<{
  /**
   * Multiselectable.
   */
  multi?: boolean;
  options?: (CommonOption | CommonOptionGroup)[];
  /**
   * Select the same option will unselect it.
   *
   * Only available in **single** option mode.
   *
   * Otherwise **the same value is assigned to the model**, which can trigger model change and thus close dropdown in `<Select />`.
   */
  clearable?: boolean;
  /**
   * Select current option when navigating, this is to simulate `<input type="radio"/>` behaviour
   *
   * You may disable this when implementing this picker as dropdown.
   *
   * Only available in **single** option mode and `clearable` is not set.
   */
  powerCursor?: boolean;
  /**
   * Enter to submit clostest form or [role='form'].
   */
  formItem?: boolean;
  disabled?: boolean;
  class?: any;
  style?: StyleValue;
  itemClass?: any;
  itemStyle?: StyleValue;
}>();

const slots = defineSlots<{
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

const groupOrOptions = computed(() => {
  let index = 0;

  const normalize = (o: CommonOption) => ({
    label: typeof o === 'object' && o ? o.label ?? o.value : '' + o,
    value: typeof o === 'object' && o ? o.value : o,
    disabled: typeof o === 'object' && o ? o.disabled : false,
    index: index++,
  });

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

const powerCursor = computed(
  () => props.powerCursor && !props.multi && !props.clearable,
);

const checkCursorOnFocus = () => {
  if (current.value < 0 || current.value >= options.value.length) {
    current.value = options.value.findIndex(
      i =>
        i.value ===
        (props.multi ? (model.value as any[]).includes(i.value) : model.value),
    );

    if (current.value === -1 && options.value.length) current.value = 0;
  }
};

const toggle = (value: any) => {
  if (props.multi) {
    const set = new Set(model.value);
    set.has(value) ? set.delete(value) : set.add(value);
    model.value = [...set];
    return;
  }

  if (props.clearable && model.value === value) model.value = null;
  else model.value = value;
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

    if (powerCursor.value) toggle(option.value);

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
      if (props.formItem) {
        e.preventDefault();
        (
          el.value!.closest('form, [role="form"]') as { submit?: () => void }
        )?.submit?.();
      }
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
    :aira-disabled="props.disabled"
    :aria-activedescendant="current === -1 ? '' : id + current"
    :aria-multiselectable="props.multi"
  >
    <template
      v-for="g in groupOrOptions"
      :key="
        g && typeof g === 'object' && 'options' in g
          ? 'g' + g.label
          : 'i' + g.value
      "
    >
      <div role="group" v-if="g && typeof g === 'object' && 'options' in g">
        <div
          v-for="i in g.options"
          :key="i.value"
          :id="id + i.index"
          @click="!i.disabled ? toggle(i.value) : undefined"
          role="option"
          :aria-selected="
            props.multi
              ? model.includes(i.value)
              : i.value === model
          "
          :aria-current="i.index === current || undefined"
          :aria-disabled="props.disabled || i.disabled || undefined"
        >
          {{ i.label }}
        </div>
      </div>
      <template v-else>
        <div
          :id="id + g.index"
          @click="!g.disabled ? toggle(g.value) : undefined"
          role="option"
          :aria-selected="
            props.multi
              ? model.includes(g.value)
              : g.value === model
          "
          :aria-current="g.index === current || undefined"
          :aria-disabled="props.disabled || g.disabled || undefined"
        >
          {{ g.label }}
        </div>
      </template>
    </template>
  </div>
</template>
