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

</script>

<template>
  <div style="position: relative">
    <div style="position: relative; height: 300px; width: 100%; overflow: auto">
      <div style="width: 500%; height: 1000px">
        <div ref="a" class="a"></div>
        <div ref="b" class="b">lorem</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
