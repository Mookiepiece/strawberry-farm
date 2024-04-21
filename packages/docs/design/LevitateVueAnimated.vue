<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { levitate } from '@mookiepiece/strawberry-farm/functions';

const flip = levitate.plugins.flip();

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
        levitate($ref, $popper, { offset: 100 }, flip);
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
</script>

<template>
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">
    <div style="width: 500%; height: 1000px">
      <button ref="button" class="sf-button mat:dusty" @click="show">
        Nike
      </button>
      <Teleport v-if="open || leaving" to="body">
        <div ref="popper" class="vp-demo-levitate-vue-animated-container (///)">
          <Transition appear @after-leave="leaving = false">
            <div v-show="open" class="vp-demo-levitate-vue-animated 🍒 p-6">
              Content
            </div>
          </Transition>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<style>
.vp-demo-levitate-vue-animated-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
}

.vp-demo-levitate-vue-animated {
  width: 100px;
  transition: all 1s var(--curve-wave);
}

.vp-demo-levitate-vue-animated.v-enter-from,
.vp-demo-levitate-vue-animated.v-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
