<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { Bag, levitate } from '@mookiepiece/strawberry-farm/functions';

const open = ref(false);
const leaving = ref(false);

const button = ref<Element>();
const popper = ref<HTMLDivElement>();

const bag = Bag();
onBeforeUnmount(bag);

const flip = levitate.plugins.flip()

watch(
  () => [popper.value, open.value] as const,
  ([el, open]) => {
    bag();
    if (open && el) {
      bag(
        levitate.auto(button.value!, () => {
          levitate(button.value!, el, {
            offset: 10,
          }, flip);
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
</script>

<template>
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">
    <div style="width: 500%; height: 1000px">
      <button ref="button" class="sf-button mat:dusty" @click="toggle">Nike</button>
      <Teleport v-if="open || leaving" to="body">
        <div ref="popper" class="vp-demo-levitate-vue-animated-container fixed (///)">
          <Transition appear @after-leave="leaving = false">
            <div v-show="open" class="vp-demo-levitate-vue-animated 🍒 p-6">
              Content
            </div>
          </Transition>
        </div>
      </Teleport>
    </div>
  </div>
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

.vp-demo-levitate-vue-animated.v-enter-active,
.vp-demo-levitate-vue-animated.v-leave-active {}

.vp-demo-levitate-vue-animated.v-enter-to,
.vp-demo-levitate-vue-animated.v-leave-from {
  /* transform: scale(1); */
}
</style>
