<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm';

const open = ref(false);

const anc = ref<HTMLElement>();
const pop = ref<HTMLDivElement>();

watchEffect(onCleanup => {
  const [$ref, $pop, $open] = [anc.value, pop.value, open.value];
  if ($ref && $pop && $open) {
    onCleanup(
      levitate.auto($ref, () => {
        levitate($ref, $pop, { plugins: [applyTransform] });
      }),
    );
  }
});
</script>

<template>
  <button ref="anc" @click="open = !open">Reference</button>
  <Teleport to="body">
    <div v-if="open" ref="pop" class="levitated (///)">
      <div data-pop-box>Content</div>
    </div>
  </Teleport>
</template>

<style scoped>
.levitated {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
