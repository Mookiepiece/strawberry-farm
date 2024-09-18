<script setup lang="ts">
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm/shared';
import { ref, watchEffect } from 'vue';

const refer = ref<HTMLElement>();
const pop = ref<HTMLElement>();

const dir = ref<'top' | 'left' | 'right' | 'bottom'>('bottom');

const positioning = () => {
  levitate(refer.value!, pop.value!, { dir: dir.value }, applyTransform);
};

watchEffect(onCleanup => onCleanup(levitate.auto(refer.value!, positioning)));

const changeDir = (_dir: 'top' | 'left' | 'right' | 'bottom') => {
  dir.value = _dir;
  positioning();
};
</script>

<template>
  <div style="position: relative">
    <div style="position: relative; height: 300px; width: 100%; overflow: auto">
      <div style="width: 500%; height: 1000px">
        <div ref="refer" class="a 🍒"></div>
        <Teleport to="body">
          <div ref="pop" class="b 🍒">lorem</div>
        </Teleport>
      </div>
    </div>
    <div class="control (///)">
      <button @click="changeDir('top')">Top</button>
      <button @click="changeDir('right')">Right</button>
      <button @click="changeDir('bottom')">Bottom</button>
      <button @click="changeDir('left')">Left</button>
    </div>
  </div>
</template>

<style scoped>
.a {
  width: 100px;
  height: 100px;
}
.b {
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  z-index: 1;
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
