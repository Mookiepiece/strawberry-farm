<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm';

const open = ref(false);

const refer = ref<HTMLElement>();
const popper = ref<HTMLDivElement>();

watchEffect(onCleanup => {
  const [$ref, $pop, $open] = [refer.value, popper.value, open.value];
  if ($ref && $pop && $open) {
    onCleanup(
      levitate.auto($ref, () => {
        levitate($ref, $pop, { offset: 100 }, applyTransform);
      }),
    );
  }
});
</script>

<template>
  <button ref="refer" @click="open = !open">Reference</button>
  <Teleport to="body">
    <div v-if="open" ref="popper" class="levitated (///)">
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
