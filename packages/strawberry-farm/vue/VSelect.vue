<script setup lang="ts">
import { ref } from 'vue';
import VInput from './VInput.vue';
import { Bag, levitate } from '../functions';
import { watch } from 'vue';
import { onBeforeUnmount } from 'vue';
import { VNode } from 'vue';

const open = ref(false);
const leaving = ref(false);

const reference = ref<VNode<typeof VInput>>();
const popper = ref<HTMLDivElement>();

const flip = levitate.plugins.flip();

const bag = Bag();
onBeforeUnmount(bag);

watch(
  () => [popper.value, open.value] as const,
  ([el, open]) => {

    console.log(reference.value)
    bag();
    if (open && el) {
      // bag(
      //   levitate.auto(reference.value!.el, () => {
      //     levitate(
      //       reference.value!,
      //       el,
      //       {
      //         offset: 10,
      //       },
      //       flip,
      //     );
      //   }),
      // );
    }
  },
);
const props = withDefaults(
  defineProps<{
    class?: any;
  }>(),
  {},
);
</script>

<template>
  <VInput ref="reference" readonly />

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
