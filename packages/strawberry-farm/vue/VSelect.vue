c<script setup lang="ts">
import { computed, ref } from 'vue';
import { PopPlugin, levitate } from '../functions';
import { CommonOption, CommonOptionGroup } from './misc';
import VPicker from './VPicker.vue';
import { usePopper } from './usePopper';

const model = defineModel<any>();

const props = withDefaults(
  defineProps<{
    multi?: boolean;
    options?: (CommonOption | CommonOptionGroup)[];
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

const flip = levitate.plugins.flip(() => ({
  limit: 200,
}));

const sameWidth: PopPlugin = config => {
  let width: any = config.$pop.style.getPropertyValue('width');
  if (!width.endsWith('px')) width = '';
  width = Number(width.slice(0, -2));

  const shouldBe = config.$ref.offsetWidth;

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

const autoHeight: PopPlugin = config => {
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
  plugins: [sameWidth, flip, dataAttr, autoHeight],
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
      {{ model ?? props.placeholder }}
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
        <VPicker
          power-pointer
          v-model="pickerModel"
          :options="props.options"
          assign-same-value
          class="VSelectPicker"
        />
      </div>
    </div>
  </Teleport>
</template>

<style>
.VPositioner:not([data-pop-dir]) {
  visibility: hidden;
}

.VPositioner[data-pop-dir='top'] {
  .VPopperBody {
    transform-origin: bottom;
  }
}
.VPositioner[data-pop-dir='bottom'] {
  .VPopperBody {
    transform-origin: top;
  }
}

:where(.VPopperBody) {
  transform: translateY(-10px);
  opacity: 0;
  transition:
    opacity 0.2s var(--curve-wave),
    transform 0.2s var(--curve-wave);

  max-height: var(--max-height, auto);
  overflow: auto;

  box-shadow: var(--shadow);
  outline: 1px solid var(--mat-solid-15);
  outline-offset: -1px;
}

:where(.VPopperBody.appear) {
  transform: scaleY(1);
  opacity: 1;
}

</style>
