<script setup lang="ts">
import { levitate } from '@mookiepiece/strawberry-farm/functions';
import { onUnmounted, ref } from 'vue';
import { onMounted } from 'vue';

const a = ref<HTMLElement>();
const b = ref<HTMLElement>();

let bin = () => {};

onMounted(() => {
  bin = levitate.auto(a.value!, () => {
    levitate.place(a.value!, b.value!);
  });
});

onUnmounted(() => bin());

const update = () => {
  levitate.place(a.value!, b.value!);
};
</script>

<template>
  <div style="height: 300px; width: 100%; overflow: auto">
    <div style="width: 200%; height: 500px">
      <div ref="a" class="a"></div>
      <div ref="b" class="b">lorem</div>
    </div>

    <div>
      <button @click="update">Place</button>
    </div>
  </div>
</template>

<style scoped>
.a {
  width: 100px;
  height: 100px;
  background-color: #def;
}
.b {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fde;
  padding: 10px;
}
</style>
