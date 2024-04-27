c
<script setup lang="ts">
import { computed, ref } from 'vue';
import { PopPlugin, flip } from '../functions';
import { CommonOptionsInput, flatCommonOptionsInput } from './misc';
import VListbox from './VListbox.vue';
import { usePopper } from './usePopper';

const model = defineModel<any>();

const props = withDefaults(
  defineProps<{
    multi?: boolean;
    options?: CommonOptionsInput;
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

const reference = ref<HTMLElement>();
const popper = ref<HTMLElement>();

const sameWidth: PopPlugin = config => {
  let width: any = config.$pop.style.getPropertyValue('width');
  if (!width.endsWith('px')) width = '';
  width = Number(width.slice(0, -2));

  const shouldBe = config.$ref.getBoundingClientRect().width;

  if (width !== shouldBe) {
    config.$pop.style.setProperty('width', shouldBe + 'px');

    const pop = config.$pop.getBoundingClientRect();
    return { ...config, pop };
  }
  return config;
};

const dataAttr: PopPlugin = config => {
  const { $pop, dir } = config;
  $pop.setAttribute('data-pop-dir', dir);
  return config;
};

const maxHeight: PopPlugin = config => {
  const { $pop, map } = config;
  $pop.style.setProperty('--max-height', Math.floor(map.height - 20) + 'px');
  return { ...config, pop: $pop.getBoundingClientRect() };
};

const { open, visible } = usePopper({
  popper,
  reference,
  configs: {
    offset: 5,
    animated: true,
    trap: true,
    clickAway: true,
  },
  plugins: [
    sameWidth,
    flip(() => ({
      limit: 200,
    })),
    dataAttr,
    maxHeight,
  ],
});

const erase = () => {
  model.value = null;
  reference.value?.focus();
};

const pickerModel = computed({
  get() {
    return model.value;
  },
  set(value) {
    open.value = false;
    model.value = value;
  },
});

const label = computed(() => {
  if (!props.options) return model.value;
  return flatCommonOptionsInput(props.options).find(
    o => o.value === model.value,
  )?.label;
});

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
      v-if="props.clearable && model != null"
      i="x"
      class="VInputEraser"
      tabindex="-1"
      @click="erase"
      aria-hidden="true"
    />
    <div
      class="VInputTrunk"
      :class="model == null ? 'VInputTrunkPlaceholder' : undefined"
    >
      {{ label ?? props.placeholder }}
    </div>
  </div>

  <Teleport to="body">
    <div
      v-show="open || visible"
      ref="popper"
      class="VPositioner"
      @keydown.esc="open = false"
      style="position: fixed; top: 0; left: 0"
    >
      <div class="VPopperBody">
        <VListbox
          power-pointer
          v-model="pickerModel"
          :options="options"
          class="VSelectPicker"
        />
      </div>
    </div>
  </Teleport>
</template>
