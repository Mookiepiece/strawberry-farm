<script setup lang="ts">
import { StyleValue, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import VInput from './VInput.vue';
import { Bag, levitate } from '../functions';
import { onClickAway } from '../html/onClickAway';
import { CommonChoice } from './misc';
import VPicker from './VPicker.vue';

const props = withDefaults(
  defineProps<{
    options?: CommonChoice[];
    disabled?: boolean;
    class?: any;
    style?: StyleValue;
  }>(),
  {},
);

const open = ref(false);
const leaving = ref(false);

const reference = ref<InstanceType<typeof VInput> | null>(null);
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
      const $ref = reference.value!.el;
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

watchEffect(onCleanup => {
  if (!open.value) return;

  const a = popper.value!;
  const b = reference.value!.el;
  onCleanup(
    onClickAway([a, b], () => {
      open.value = false;
    }),
  );
});

const toggle = () => {
  if (!open.value) {
    open.value = true;
    leaving.value = true;
  } else {
    open.value = false;
  }
};
</script>

<template>
  <VInput ref="reference" readonly @click="toggle" />

  <Teleport v-if="open || leaving" to="body">
    <div ref="popper" class="(///)" style="position: fixed; top: 0; left: 0">
      <Transition appear @after-leave="leaving = false">
        <div v-show="open" class="vp-demo-levitate-vue-animated">
          <VPicker :options="props.options" class="VRadioGroup [A]" />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style>
.vp-demo-levitate-vue-animated {
  transition: all 1s var(--curve-wave);
}

.vp-demo-levitate-vue-animated.v-enter-from,
.vp-demo-levitate-vue-animated.v-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
