<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Bag, onTimeout, trap } from '../shared';

defineOptions({
  inheritAttrs: false,
});

const model = defineModel();

const props = defineProps<{
  strong?: boolean;
}>();

const bag = Bag();
onUnmounted(() => bag());

const surface = ref<HTMLElement>();

const afterEnter = () => {
  const el = surface.value;
  if (el) {
    bag(trap(el));
  }
};

const close = () => void (!props.strong && (model.value = false));

let down = false;
const _bag = Bag();
const handlePointerdown = () => (
  (down = true), _bag(onTimeout(() => (down = false)))
);
const handlePointerUp = () => down && close();
</script>

<template>
  <Teleport to="body">
    <Transition @enter="afterEnter" @leave="() => bag()">
      <div
        v-if="model"
        @keydown.esc="close"
        class="VCurtain"
        @pointerdown.self.prevent="handlePointerdown"
        @pointerup.self.prevent="handlePointerUp"
        tabindex="-1"
        ref="surface"
      >
        <div class="VModal" v-bind="$attrs">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
