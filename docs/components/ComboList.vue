<script setup lang="ts">
import { watch, ref } from 'vue';

const links = [
  {
    label: '再嘬一口入肺里，是我今生唯一的夙愿...《死一样的抽过》',
    value: 'https://www.bilibili.com/video/BV1tJ4m1T7QL',
  },
  {
    label: '或许，我早已经不属于这个地方《死一样的戒过》',
    value: 'https://www.bilibili.com/video/BV1W4421U7dU',
  },
  {
    label: '是我不听劝，迷失在花花世界...《失烟症》',
    value: 'https://www.bilibili.com/video/BV1Gb42177CL',
  },
];

const current = ref(0);

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      current.value = Math.max(0, current.value - 1);
      break;
    case 'ArrowDown':
      e.preventDefault();
      current.value = Math.min(links.length - 1, current.value + 1);
      break;
    case 'Enter':
      e.preventDefault();
      box.value?.nextElementSibling
        ?.querySelector<HTMLAnchorElement>('a.current')
        ?.click();
  }
};

const q = ref('');
const box = ref<HTMLInputElement>();

watch(current, $current => {
  if ($current >= 0) {
    q.value = links[$current].label;
    box.value?.setSelectionRange(q.value.length, q.value.length);
  }
});
</script>

<template>
  <input v-model="q" @keydown="handleKeydown" ref="box" />
  <div>
    <a
      v-for="({ label, value }, index) in links"
      :key="index"
      target="_blank"
      :href="value"
      :class="{ current: current === index }"
      >{{ label }}</a
    >
  </div>
</template>

<style scoped>
input,
a {
  display: block;
  width: 100%;
}
a.current,
a:hover {
  background: var(--mat-air-1);
}

a:active {
  background: var(--mat-air-2);
}
</style>
