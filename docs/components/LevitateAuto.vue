<script setup lang="ts">
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm/shared';
import { ref, watchEffect } from 'vue';

const visible = ref(false);

const anchor = ref<HTMLElement>();
const pop = ref<HTMLElement>();

const dir = ref<'top' | 'left' | 'right' | 'bottom'>('bottom');

const positioning = () => {
  levitate(anchor.value!, pop.value!, {
    dir: dir.value,
    plugins: [applyTransform],
  });
};

watchEffect(
  onCleanup =>
    anchor.value && onCleanup(levitate.auto(anchor.value, positioning)),
);

const changeDir = (_dir: 'top' | 'left' | 'right' | 'bottom') => {
  dir.value = _dir;
  positioning();
};
</script>

<template>
  <div style="position: relative">
    <div style="height: 300px; overflow: auto">
      <div style="width: 500%; height: 1000px">
        <div ref="anchor" class="reference 🍒"></div>
        <Teleport to="body">
          <div
            ref="pop"
            class="floating 🍒"
            :style="!visible ? { clipPath: 'circle(0)' } : {}"
          >
            🍓
          </div>
        </Teleport>
      </div>
    </div>
    <div class="control (///)">
      <button @click="visible = !visible">Show</button>
      &nbsp;
      <button @click="changeDir('top')">Top</button>
      <button @click="changeDir('right')">Right</button>
      <button @click="changeDir('bottom')">Bottom</button>
      <button @click="changeDir('left')">Left</button>
    </div>
  </div>
</template>

<style scoped>
.reference {
  width: 100px;
  height: 100px;
}
.floating {
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
}

.control {
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-100%, -100%);
  width: max-content;
  max-width: 100%;
}
</style>
