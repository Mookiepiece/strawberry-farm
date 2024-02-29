<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Bin, trap } from '../functions';

const model = defineModel();

const { closeOnCurtainClick } = defineProps({
  closeOnCurtainClick: {
    default: true,
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
        @keydown.esc="model = false"
        class="SFCurtain"
        @click.self="closeOnCurtainClick && (model = false)"
      >
        <div class="SFModal" ref="surface" tabindex="-1">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
