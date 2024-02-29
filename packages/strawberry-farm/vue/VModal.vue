<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Bin, trap } from '../functions';

const model = defineModel();

const { unclosable } = defineProps({
  unclosable: {
    default: false,
  },
});

const bin = Bin();

const surface = ref<HTMLElement>();

const afterEnter = () => {
  const el = surface.value;
  if (el) {
    bin(trap(el));
  }
};

onUnmounted(() => bin());

const close = () => void (!unclosable && (model.value = false));
</script>

<template>
  <Teleport to="body">
    <Transition
      name="scale"
      @after-enter="afterEnter"
      @after-leave="() => bin()"
    >
      <div
        v-if="model"
        @keydown.esc="close"
        class="SFCurtain"
        @click.self="close"
      >
        <div class="SFModal" ref="surface" tabindex="-1">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
