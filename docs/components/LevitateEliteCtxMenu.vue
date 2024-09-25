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

let $anc: any = {};
const show = (e: MouseEvent) => {
  const { clientX: x, clientY: y } = e;
  $anc = {
    getBoundingClientRect: (): DOMRect => ({
      x,
      y,
      top: y,
      left: x,
      width: 1,
      height: 1,
      bottom: y + 1,
      right: x + 1,
      toJSON() {},
    }),
    setAttribute(){},
    offsetWidth: 1,
    offsetHeight: 1,
    clientWidth: 1,
    clientHeight: 1,
    scrollWidth: 1,
    scrollHeight: 1,
  };
  open.value = true;
};

watchEffect(onCleanup => {
  const [$pop, $open] = [pop.value, open.value];
  if ($pop && $open) {
    // onCleanup(
      // levitate.auto($anc, () => {
        levitate($anc, $pop, {
          dir:'right',
          align:'start',
          plugins: [applyTransform] })
      // }),
    // );
  }
});

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
  <button ref="anchor" @contextmenu.prevent="show">Anchor</button>

  <Teleport to="body">
    <i tabindex="0" v-if="open" data-stencil />
    <Transition appear>
      <div
        v-if="open"
        ref="pop"
        data-pop
        data-ctx-menu
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
