<script setup lang="ts">
import {
  applyTransform,
  autoPlacement,
  flip,
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
            flip({ margin: 15 }),
            maxHeight,
            applyTransform,
          ],
        });
      }),
    );
  }
});

const count = ref(1);
</script>

<template>
  <button ref="anc" @click="open = !open">Max Height</button>
  <Teleport to="body">
    <span ref="pop" v-if="open" data-pop class="p-2">
      <input type="number" v-model="count" />
      <div class="list (///)">
        <span class="🍒" v-for="i in Math.max(0, count)">{{ i }}</span>
      </div>
    </span>
  </Teleport>
</template>

<style scoped>
[data-pop] {
  display: grid;
  grid: 30px 3fr / 1fr;
  outline: 2px solid;
}

.list {
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>
