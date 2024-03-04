<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Bin, trap } from '../functions';

const model = defineModel();

const { strong } = defineProps({
  strong: {
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

const close = () => void (!strong && (model.value = false));
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
        tabindex="-1"
        ref="surface"
      >
        <div class="SFModal">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
