<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import {
  applyTransform,
  flip,
  levitate,
  trap,
} from '@mookiepiece/strawberry-farm/shared';

const open = ref(false);
const leaving = ref(false);

const button = ref<HTMLElement>();
const popper = ref<HTMLDivElement>();

watchEffect(onCleanup => {
  const $ref = button.value;
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
    leaving.value = true;
  } else {
    open.value = false;
  }
};

watchEffect(onCleanup => {
  const $popper = popper.value;
  const $open = open.value;
  if ($open && $popper) onCleanup(trap($popper));
});
</script>

<template>
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">
    <div style="width: 500%; height: 1000px">
      <button ref="button" @click="show">Reference</button>

      <Teleport to="body">
        <div tabindex="0" v-if="open" data-stencil></div>
        <div v-if="open || leaving" ref="popper" data-pop class="(///)">
          <Transition appear @after-leave="leaving = false">
            <div
              v-show="open"
              class="pop-body 🍒 p-6"
              tabindex="-1"
              @keydown.esc.prevent="open = false"
            >
              <input />
              <input />
              <input />
            </div>
          </Transition>
        </div>
        <div tabindex="0" v-if="open" data-stencil></div>
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
.pop-body {
  width: 100px;
  transition: all 1s var(--curve-wave);

  &.v-enter-from,
  &.v-leave-to {
    transform: translateX(200px);
    opacity: 0;
  }
}

[data-stencil] {
  position: fixed;
  top: 0;
  left: 0;
  display: inline;
  width: 1px;
  height: 1px;
  pointer-events: none;
  clip-path: circle(0);
}
</style>
