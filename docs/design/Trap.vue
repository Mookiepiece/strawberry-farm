<script setup lang="ts">
import { trap } from '@mookiepiece/strawberry-farm/shared';
import { ref } from 'vue';

const a = ref<HTMLElement>();
const b = ref<HTMLElement>();
const c = ref<HTMLElement>();
const d = ref<HTMLElement>();

let releaseB = () => {};
const trapB = () => {
  releaseB = trap(b.value!);
};

let releaseC = () => {};
const trapC = () => {
  releaseC = trap(c.value!);
};

let releaseD = () => {};
const trapD = () => {
  releaseD = trap(d.value!);
};
</script>

<template>
  <div class="table">
    <div class="tr">
      <button class="mat:solid">a</button>
      <button class="mat:solid">b</button>
      <button class="mat:solid" @click="trapB">-></button>
    </div>
    <div class="tr" ref="b" @keydown.esc="releaseB">
      <button class="mat:solid">a</button>
      <button class="mat:solid">b</button>
      <button class="mat:solid" @click="trapC">-></button>
    </div>
    <div class="tr" ref="c" @keydown.esc="releaseC">
      <button class="mat:solid">a</button>
      <button class="mat:solid">b</button>
      <button class="mat:solid" @click="trapD">-></button>
    </div>
    <div class="tr" ref="d" @keydown.esc="releaseD">
      <button class="mat:solid">a</button>
      <button class="mat:solid">b</button>
      <button class="mat:solid">c</button>
    </div>
  </div>
</template>

<style scoped>
.table {
  display: grid;
  max-width: 300px;
  gap: 5px;
}
.tr {
  display: grid;
  grid: 1fr /1fr 1fr 1fr;
  gap: 5px;
}

button {
  padding: 10px;
}
</style>
