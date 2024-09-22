<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm/shared';

const open = ref(false);

const anchor = ref<HTMLElement>();
const pop = ref<HTMLDivElement>();

watchEffect(onCleanup => {
  const [$anc, $pop, $open] = [anchor.value, pop.value, open.value];
  if ($anc && $pop && $open) {
    onCleanup(
      levitate.auto($anc, () => {
        levitate($anc, $pop, { plugins: [applyTransform] });
      }),
    );
  }
});

const toggle = () => (open.value = !open.value);
</script>

<template>
  <button ref="anchor" @click="toggle">Reference</button>
  <Teleport to="body">
    <Transition appear>
      <div v-if="open" ref="pop" class="pop pop-body 🍒 p-6">Content</div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.pop {
  position: fixed;
  left: 0;
  top: 0;
}

.pop-body {
  width: 100px;
  transition:
    transform 1s var(--curve-wave),
    opacity 1s var(--curve-wave);

  &.v-enter-from,
  &.v-leave-to {
    transform: translateX(200px);
    opacity: 0;
  }
}
</style>
