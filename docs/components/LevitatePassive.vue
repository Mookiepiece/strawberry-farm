<script setup lang="ts">
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm/shared';
import { ref } from 'vue';

const anchor = ref<HTMLElement>();
const pop = ref<HTMLElement>();

const touched = ref(false);

const changeDir = (_dir: any) => {
  touched.value = true;

  levitate(anchor.value!, pop.value!, {
    dir: _dir,
    plugins: [applyTransform],
  });
};
</script>

<template>
  <div style="position: relative">
    <div style="position: relative; height: 300px; width: 100%; overflow: auto">
      <div style="width: 500%; height: 1000px">
        <div ref="anchor" class="a 🍒"></div>
        <Teleport to="body">
          <div
            ref="pop"
            class="b 🍒"
            :style="!touched ? { clipPath: 'circle(0)' } : {}"
          >
            🍓
          </div>
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
