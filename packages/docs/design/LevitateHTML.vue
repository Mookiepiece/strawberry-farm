<script setup lang="ts">
import { Bag, flip, levitate } from '@mookiepiece/strawberry-farm/shared';
import { onUnmounted, ref } from 'vue';
import { onMounted } from 'vue';

const a = ref<HTMLElement>();
const b = ref<HTMLElement>();

let bag = Bag();
onUnmounted(bag);

const dir = ref<'top' | 'left' | 'right' | 'bottom'>('bottom');

onMounted(() => {
  bag(levitate.auto(a.value!, update));
});

const update = () => {
  levitate(a.value!, b.value!, { dir: dir.value }, flip());
};

const changeDir = (_dir: 'top' | 'left' | 'right' | 'bottom') => {
  dir.value = _dir;
  update();
};
</script>

<template>
  <div style="position: relative">
    <div style="position: relative; height: 300px; width: 100%; overflow: auto">
      <div style="width: 500%; height: 1000px">
        <div ref="a" class="a 🍒"></div>
        <Teleport to="body">
          <div ref="b" class="b 🍒">lorem</div>
        </Teleport>
      </div>
    </div>
    <div
      style="
        position: absolute;
        top: 100%;
        left: 100%;
        transform: translate(-100%, -100%);
        width: max-content;
        max-width: 100%;
      "
    >
      <button @click="update">Place</button>
      <br />
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
</style>
