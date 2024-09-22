<script setup lang="ts">
import {
  applyTransform,
  autoPlacement,
  levitate,
  margin,
} from '@mookiepiece/strawberry-farm/shared';
import { ref, watchEffect } from 'vue';

const open = ref(false);

const anc = ref<HTMLElement>();
const pop = ref<HTMLElement>();

watchEffect(onCleanup => {
  const [$ref, $pop, $open] = [anc.value, pop.value, open.value];
  if ($ref && $pop && $open) {
    onCleanup(
      levitate.auto($ref, () => {
        levitate($ref, $pop, {
          plugins: [margin(15), autoPlacement({ margin: 15 }), applyTransform],
        });
      }),
    );
  }
});
</script>

<template>
  <button ref="anc" @click="open = !open">Auto Placement</button>
  <Teleport to="body">
    <span ref="pop" v-if="open" data-pop class="🍒 p-6">🍒</span>
  </Teleport>
</template>
