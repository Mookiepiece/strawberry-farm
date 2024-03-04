<script setup lang="ts">
import { levitate } from '@mookiepiece/strawberry-farm/functions';
import { ref } from 'vue';
import { onMounted } from 'vue';

const a = ref<HTMLElement>();
const b = ref<HTMLElement>();

onMounted(() => {
  levitate.place(a.value!,b.value!);

  // levitate.measure('aaaa', a.value!.getBoundingClientRect());
  // levitate.measure('bbbb', b.value!.getBoundingClientRect());
});
</script>

<template>
  <div class="[A]">
    <div ref="a" class="a"></div>
    <div ref="b" class="b">lorem</div>
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
  width: min-content;
  background-color: #fde;
}
</style>
