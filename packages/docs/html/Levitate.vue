<script setup lang="ts">
import { Bag, levitate } from '@mookiepiece/strawberry-farm/functions';
import { onUnmounted, ref } from 'vue';
import { onMounted } from 'vue';

const a = ref<HTMLElement>();
const b = ref<HTMLElement>();

let bag = Bag();
onUnmounted(bag);

const dirRef = ref<'top' | 'left' | 'right' | 'bottom'>('bottom');

onMounted(() => {
  bag(levitate.auto(a.value!, update));
});

const update = () => {
  levitate.place(a.value!, b.value!, { dir: dirRef.value });
};

const changeDir = (dir: 'top' | 'left' | 'right' | 'bottom') => {
  dirRef.value = dir;
  update();
};
</script>

<template>
  <div style="height: 300px; width: 100%; overflow: auto">
    <div>
      <button @click="update">Place</button>
      <br />
      <button @click="changeDir('top')">Top</button>
      <button @click="changeDir('right')">Right</button>
      <button @click="changeDir('bottom')">Bottom</button>
      <button @click="changeDir('left')">Left</button>
    </div>
    <div style="width: 200%; height: 500px">
      <div ref="a" class="a"></div>
      <div ref="b" class="b">lorem</div>
    </div>
  </div>
</template>

<style scoped>
.a {
  width: 100px;
  height: 100px;
  color: var(--black-text1);
  background-color: #def;
}
.b {
  position: fixed;
  top: 0;
  left: 0;
  color: var(--black-text1);
  background-color: #fde;
  padding: 10px;
}
</style>
