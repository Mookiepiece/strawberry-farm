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
const popper = ref<HTMLDivElement>();

watchEffect(onCleanup => {
  const $ref = anchor.value;
  const $popper = popper.value;
  const $open = open.value;
  if ($ref && $popper && $open) {
    onCleanup(
      levitate.auto($ref, () => {
        levitate($ref, $popper, { plugins: [applyTransform] });
      }),
    );
  }
});

const show = () => {
  if (!open.value) {
    open.value = true;
  } else {
    open.value = false;
  }
};

watchEffect(onCleanup => {
  const $anc = anchor.value;
  const $pop = popper.value;
  if ($anc && $pop)
    onCleanup(
      onClickAway([$pop, $anc], () => {
        open.value = false;
      }),
    );
});

watchEffect(onCleanup => {
  const $popper = popper.value;
  const $open = open.value;
  if ($open && $popper) {
    onCleanup(trap($popper, theif => theif !== anchor.value));
  }
});
</script>

<template>
  <button ref="anchor" @click="show()">Reference</button>

  <Teleport to="body">
    <i tabindex="0" v-if="open" data-stencil />
    <Transition appear>
      <div
        v-if="open"
        ref="popper"
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
