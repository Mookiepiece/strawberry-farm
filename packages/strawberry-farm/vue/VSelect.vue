<script setup lang="ts">
import { StyleValue, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { Bag, fx, levitate, trap } from '../functions';
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
    class?: any;
    style?: StyleValue;
  }>(),
  {},
);

const open = ref(false);
const appeared = ref(false);

const reference = ref<HTMLDivElement | null>(null);
const popper = ref<HTMLDivElement>();

const flip = levitate.plugins.flip(() => ({
  limit: 200,
}));

const bag = Bag();
onBeforeUnmount(bag);

const sameWidth: typeof flip = config => {
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

const dataAttr: typeof flip = config => {
  const { $pop, dir } = config;
  $pop.setAttribute('data-pop-dir', dir);
  return config;
};

const autoHeight: typeof flip = config => {
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
          appeared.value = true;
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

{
  const bag = Bag();
  onBeforeUnmount(bag);
  watchEffect(async () => {
    bag();
    if (!open.value || !appeared.value || !popper.value) return;
    bag(trap(popper.value));
  });
}

{
  const bag = Bag();
  onBeforeUnmount(bag);
  watchEffect(() => {
    bag();
    if (!popper.value || !reference.value) return;

    const a = popper.value!;
    const b = reference.value!;
    bag(onClickAway([a, b], () => (open.value = false)));
  });
}

{
  const bag = Bag();
  onBeforeUnmount(bag);
  watchEffect(() => {
    bag();
    if (!appeared.value || !popper.value) return;

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
          appeared.value = false;
        },
      });
    }
  });
}

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
    class="VSelect"
    tabindex="0"
    ref="reference"
    @click="toggle"
    @keydown.space="toggle"
    @keydown.enter="toggle"
    @keydown.up="toggle"
    @keydown.down="toggle"
    role="button"
    aria-haspopup="true"
    :aria-expanded="open"
  />

  <Teleport v-if="open || appeared" to="body">
    <div
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
