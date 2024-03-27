<script setup lang="ts">
import { ref } from 'vue';
import VInput from './VInput.vue';
import { Bag, levitate } from '../functions';
import { watch } from 'vue';
import { onBeforeUnmount } from 'vue';
import { onClickAway } from '../html/onClickAway';
import { watchEffect } from 'vue';

const props = withDefaults(
  defineProps<{
    class?: any;
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

watch(
  () => [popper.value, open.value] as const,
  ([el, open]) => {
    bag();
    if (open && el) {
      bag(
        levitate.auto(reference.value!.el, () => {
          levitate(
            reference.value!.el,
            el,
            {
              offset: 10,
            },
            flip,
          );
        }),
      );
    }
  },
);

watchEffect(onCleanup => {
  const a = popper.value;
  const b = reference.value?.el;
  onCleanup(
    onClickAway([a, b].filter(Boolean) as any[], () => {
      console.log(1);

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
    <div
      ref="popper"
      class="vp-demo-levitate-vue-animated-container fixed (///)"
    >
      <Transition appear @after-leave="leaving = false">
        <div v-show="open" class="vp-demo-levitate-vue-animated 🍒 p-6">
          Content
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style>
.vp-demo-levitate-vue-animated-container {
  z-index: 1;
}

.vp-demo-levitate-vue-animated {
  width: 100px;
  transition: all 1s var(--curve-wave);
}

.vp-demo-levitate-vue-animated.v-enter-from,
.vp-demo-levitate-vue-animated.v-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
