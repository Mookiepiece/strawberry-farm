<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import {
  applyTransform,
  levitate,
  trap,
} from '@mookiepiece/strawberry-farm/shared';
import { onClickAway } from '@mookiepiece/strawberry-farm/html/onClickAway';

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

watchEffect(onCleanup => {
  const $anc = anchor.value;
  const $pop = pop.value;
  if ($anc && $pop)
    onCleanup(
      onClickAway([$pop, $anc], () => {
        open.value = false;
      }),
    );
});

watchEffect(onCleanup => {
  const $pop = pop.value;
  const $open = open.value;
  if ($open && $pop) {
    onCleanup(trap($pop, theif => theif !== anchor.value));
  }
});
</script>

<template>
  <button
    ref="anchor"
    @click="toggle"
    @keydown.up.prevent="open = true"
    @keydown.down.prevent="open = true"
    @keydown.esc.prevent="open = false"
  >
    Anchor
  </button>

  <Teleport to="body">
    <i tabindex="0" v-if="open" data-stencil />
    <Transition appear>
      <div
        v-if="open"
        ref="pop"
        data-pop
        class="pop-body 🍒 p-6"
        tabindex="-1"
        @keydown.esc.prevent="open = false"
      >
        <input />
        <input />
        <input />
      </div>
    </Transition>
    <i tabindex="0" v-if="open" data-stencil />
  </Teleport>
</template>

<style scoped>
.pop-body {
  width: 150px;
  transition:
    transform 1s var(--curve-wave),
    opacity 1s var(--curve-wave);

  &.v-enter-from,
  &.v-leave-to {
    transform: scale(0);
    opacity: 0;
  }
}

[data-stencil] {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  clip-path: circle(0);
}

input {
  width: 100%;
}
</style>
