<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Bag, onTimeout, trap } from '../functions';

const model = defineModel();

const { strong } = defineProps({
  strong: {
    default: false,
  },
});

const bag = Bag();
onUnmounted(() => bag());

const surface = ref<HTMLElement>();

const afterEnter = () => {
  const el = surface.value;
  if (el) {
    bag(trap(el));
  }
};

const close = () => void (!strong && (model.value = false));

let down = false;
const _bag = Bag();
const handlePointerDown = () => (
  (down = true), _bag(onTimeout(() => (down = false)))
);
const handlePointerUp = () => down && close();
</script>

<template>
  <Teleport to="body">
    <Transition
      @after-enter="afterEnter"
      @after-leave="() => bag()"
    >
      <div
        v-if="model"
        @keydown.esc="close"
        class="VCurtain"
        @pointerdown.self.prevent="handlePointerDown"
        @pointerup.self.prevent="handlePointerUp"
        tabindex="-1"
        ref="surface"
      >
        <div class="VModal">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
