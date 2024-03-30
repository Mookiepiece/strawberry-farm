<script setup lang="ts">
import { StyleValue, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { Bag, levitate, trap } from '../functions';
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
const leaving = ref(false);

const reference = ref<HTMLDivElement | null>(null);
const popper = ref<HTMLDivElement>();

const flip = levitate.plugins.flip();

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
              offset: 10,
            },
            sameWidth,
            flip,
          );
        }),
      );
    }
  },
);

const toggle = () => {
  if (!open.value) {
    open.value = true;
    leaving.value = true;
  } else {
    open.value = false;
  }
};

{
  const bag = Bag();
  onBeforeUnmount(bag);
  watchEffect(() => {
    bag();
    if (!open.value || !popper.value) return;

    const a = popper.value!;
    bag(trap(a));
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

const pickerModel = computed({
  get() {
    return model.value;
  },
  set(value) {
    // if (!props.multi) {
    //   toggle();
    // }
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
    @keydown.up="toggle"
    @keydown.down="toggle"
    :aria-expanded="open"
  />

  <Teleport v-if="open || leaving" to="body">
    <div
      ref="popper"
      class="Positioner"
      @keydown.esc="toggle"
      style="position: fixed; top: 0; left: 0"
    >
      <Transition appear @after-leave="leaving = false">
        <div v-show="open" class="PopperAnimator">
          <VPicker
            v-model="pickerModel"
            :options="props.options"
            class="VSelectPicker"
          />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style>
.PopperAnimator {
  transition: all 1s var(--curve-wave);
}

.PopperAnimator.v-enter-from,
.PopperAnimator.v-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
