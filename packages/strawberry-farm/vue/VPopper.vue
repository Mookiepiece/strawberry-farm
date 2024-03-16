<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { Bag, levitate } from '../functions';

const open = ref(false);
const leaving = ref(false);

const button = ref<Element>();
const popper = ref<HTMLDivElement>();

const bag = Bag();
onBeforeUnmount(bag);

watch(
  () => [popper.value, open.value] as const,
  ([el, open]) => {
    bag();
    if (open && el) {
      bag(
        levitate.auto(button.value!, () => {
          levitate(button.value!, el, {
            offset: 100,
          });
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
  <button ref="button" class="sf-button mat:dusty" @click="toggle">Nike</button>
  <Teleport v-if="open || leaving" to="body">
    <div
      ref="popper"
      class="sf-levitated fixed (///)"
    >
      <Transition appear @after-leave="leaving = false">
        <div v-show="open" class="sf-popper 🍒 p-6">
          Content
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style>

.sf-levitated {

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
.vp-demo-levitate-vue-animated.v-leave-active {
}

.vp-demo-levitate-vue-animated.v-enter-to,
.vp-demo-levitate-vue-animated.v-leave-from {
  /* transform: scale(1); */
}
</style>
