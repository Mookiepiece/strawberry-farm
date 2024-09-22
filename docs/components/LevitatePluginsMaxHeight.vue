<script setup lang="ts">
import {
  applyTransform,
  autoPlacement,
  levitate,
  margin,
  maxHeight,
} from '@mookiepiece/strawberry-farm/shared';
import { ref, watchEffect } from 'vue';

const open = ref(false);

const anc = ref<HTMLElement>();
const pop = ref<HTMLElement>();

watchEffect(onCleanup => {
  const [$ref, $pop, $open] = [anc.value, pop.value, open.value];
  if ($ref && $pop && $open) {
    onCleanup(
      levitate.auto([$ref, $pop], () => {
        levitate($ref, $pop, {
          plugins: [
            margin(15),
            autoPlacement({ margin: 15 }),
            maxHeight,
            applyTransform,
          ],
        });
      }),
    );
  }
});

const count = ref(100);
</script>

<template>
  <button ref="anc" @click="open = !open">Max Height</button>
  <Teleport to="body">
    <span ref="pop" v-if="open" data-pop class="(///) p-6 grid">
      <input type="number" v-model="count" />
      <span class="🍒" v-for="i in Math.max(0, count)">{{ i }}</span>
    </span>
  </Teleport>
</template>

<style scoped>
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  outline: 2px solid;
}
</style>
