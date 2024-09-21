<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import {
  applyTransform,
  flip,
  levitate,
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

watchEffect(onCleanup => {});
</script>

<template>
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">
    <div style="width: 500%; height: 1000px">
      <button ref="button" @click="show">Reference</button>
      <Teleport v-if="open || leaving" to="body">
        <div ref="popper" class="pop-container (///)">
          <Transition appear @after-leave="leaving = false">
            <div v-show="open" class="pop-body 🍒 p-6">Content</div>
          </Transition>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
.pop-container {
  position: fixed;
  left: 0;
  top: 0;
}

.pop-body {
  width: 100px;
  transition: all 1s var(--curve-wave);
}

.pop-body.v-enter-from,
.pop-body.v-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
