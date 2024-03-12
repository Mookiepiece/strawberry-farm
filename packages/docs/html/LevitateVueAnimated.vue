<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { Bag, levitate } from '@mookiepiece/strawberry-farm/functions';

const open = ref(false);
const leaving = ref(false);

const button = ref<Element>();
const popper = ref<HTMLDivElement>();

const bag = Bag();
onUnmounted(bag);

// watch(
//   () => [popper.value, open.value] as const,
//   ([el, show]) => {
//     if (el) {
//       bag(
//         levitate.auto(button.value!, () => {
//           levitate.place(button.value!, el, {
//             offset: 100,
//           });
//         }),
//       );
//     } else {
//       if (!show) {
//         bag();
//       }
//     }
//   },
// );

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
      <button ref="button" class="sf-button" @click="toggle">Nike</button>
      <Transition >
        <div class="vp-demo-levitate-vue-animated" v-show="open">Content</div>
      </Transition>
      <!-- <Teleport to="body">
        <div
          ref="popper"
          class="vp-demo-levitate-vue-animated-container fixed (///)"
        ></div>
      </Teleport> -->
    </div>
  </div>
</template>

<style>
.vp-demo-levitate-vue-animated-container {
}

.vp-demo-levitate-vue-animated {
  width: 100px;
  background-color: pink;
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
