<script setup lang="ts">
import { onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { Bag, PopPlugin, fx, levitate, trap } from '../functions';
import { onClickAway } from '../html/onClickAway';
import { CommonOption, CommonOptionGroup } from './misc';
import VPicker from './VPicker.vue';
import { computed } from 'vue';

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

const open = ref(false);
const visible = ref(false);

const reference = ref<HTMLElement>();
const popper = ref<HTMLElement>();

const flip = levitate.plugins.flip(() => ({
  limit: 200,
}));

const bag = Bag();
onBeforeUnmount(bag);

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

watch(
  () => [popper.value, open.value] as const,
  ([$pop, open]) => {
    bag();
    if (open && $pop) {
      const $ref = reference.value!;
      bag(
        levitate.auto($ref, () => {
          levitate(
            $ref,
            $pop,
            {
              offset: 5,
            },
            sameWidth,
            flip,
            dataAttr,
            autoHeight,
          );
          visible.value = true;
        }),
      );
    }
  },
);

const toggle = () => {
  if (!open.value) {
    open.value = true;
  } else {
    open.value = false;
  }
};

watchEffect(onCleanup => {
  if (!open.value || !visible.value || !popper.value) return;
  onCleanup(trap(popper.value));
});

watchEffect(onCleanup => {
  if (!popper.value || !reference.value) return;

  const a = popper.value!;
  const b = reference.value!;
  onCleanup(onClickAway([a, b], () => (open.value = false)));
});

watchEffect(() => {
  if (!visible.value || !popper.value) return;

  const body = popper.value.querySelector('.PopperBody')! as HTMLDivElement;

  if (open.value) {
    fx.transition(body, {
      to(bag) {
        body.classList.add('appear');
        bag(() => body.classList.remove('appear'));
      },
    });
  } else {
    fx.transition(body, {
      to(bag) {
        body.classList.remove('appear');
        bag(() => body.classList.add('appear'));
      },
      done() {
        visible.value = false;
      },
    });
  }
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
    @click.self="toggle"
    @keydown.space="toggle"
    @keydown.enter="toggle"
    @keydown.up="toggle"
    @keydown.down="toggle"
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
      class="Positioner"
      @keydown.esc="toggle"
      style="position: fixed; top: 0; left: 0"
    >
      <div class="PopperBody">
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
.Positioner:not([data-pop-dir]) {
  visibility: hidden;
}

.Positioner[data-pop-dir='top'] {
  .PopperBody {
    transform-origin: bottom;
  }
}
.Positioner[data-pop-dir='bottom'] {
  .PopperBody {
    transform-origin: top;
  }
}
</style>
