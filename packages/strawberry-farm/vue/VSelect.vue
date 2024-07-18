<script setup lang="ts" generic="T = undefined">
import { computed, ref } from 'vue';
import {
  applyTransform,
  flip,
  maxHeight,
  sameWidth,
} from '../functions';
import { CommonOptionsInput, flatCommonOptionsInput } from './misc';
import VListbox from './VListbox.vue';
import { usePopper } from './usePopper';

const model = defineModel<any>();

const props = withDefaults(
  defineProps<{
    options?: CommonOptionsInput<T>;
    disabled?: boolean;
    placeholder?: string;
    clearable?: boolean;
  }>(),
  {},
);

defineSlots<{
  prefix: any;
  suffix: any;
}>();

const multi = computed(() => Array.isArray(model.value));

const reference = ref<HTMLElement>();
const popper = ref<HTMLElement>();

const { open, visible } = usePopper({
  popper,
  reference,
  configs: {
    offset: 5,
    animated: true,
    trap: true,
    clickAway: true,
  },
  plugins: [sameWidth, flip(), maxHeight, applyTransform],
});

const erase = () => {
  if (multi.value) {
    model.value.splice(0, model.value.length);
    model.value = model.value;
  } else model.value = null;
  reference.value?.focus();
};

const pickerModel = computed({
  get() {
    return model.value;
  },
  set(value) {
    if (!multi.value) open.value = false;
    model.value = value;
  },
});

const label = computed(() => {
  if (!props.options) return model.value;

  const choices = flatCommonOptionsInput(props.options);
  return multi.value
    ? choices
        .filter(o => model.value?.includes(o.value))
        .map(o => o.label)
        .join(', ')
    : choices.find(o => o.value === model.value)?.label;
});

const empty = computed(() =>
  multi.value ? !model.value?.length : model.value == null,
);

defineExpose({
  el: reference,
});
</script>

<template>
  <div
    class="VInput VSelect"
    tabindex="0"
    ref="reference"
    @click.self="open = !open"
    @keydown.space="open = true"
    @keydown.enter="open = true"
    @keydown.up="open = true"
    @keydown.down="open = true"
    role="button"
    aria-haspopup="true"
    :aria-expanded="open"
    v-bind="$attrs"
  >
    <div class="VInputPrefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </div>
    <div class="VInputSuffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
    <i-feather
      v-if="clearable && !disabled && !empty"
      i="x"
      class="VInputEraser"
      tabindex="-1"
      @click="erase"
      aria-hidden="true"
    />
    <div
      class="VInputTrunk"
      :class="empty ? 'VInputTrunkPlaceholder' : undefined"
    >
      {{ label ?? placeholder }}
    </div>
  </div>

  <Teleport to="body">
    <div
      v-show="open || visible"
      ref="popper"
      data-pop
      @keydown.esc="open = false"
      style="position: fixed; top: 0; left: 0"
    >
      <div data-pop-body>
        <VListbox
          :multi="multi"
          magnetic
          v-model="pickerModel"
          :options="options"
          class="VSelectPicker"
        />
      </div>
    </div>
  </Teleport>
</template>
