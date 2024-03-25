<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';

const z = ref<any[]>([]);

onMounted(() => {
  import('@mookiepiece/strawberry-farm/html/IFeatherElement').then(
    ({ IFeatherElement }) => {
      IFeatherElement.install();
      z.value = Object.keys(IFeatherElement.names);
    },
  );
});
</script>

<template>
  <div class="good">
    <div class="good-cell [A] [CC] mat:air p-6" v-for="k in z">
      <i-feather style="font-size: 24px" :i="k"></i-feather>
      <span class="f3 [--]">{{ k }}</span>
    </div>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  grid: auto-flow 1fr / repeat(auto-fill, 150px);
}

.good-cell {
  border-radius: var(--2);
  cursor: pointer;
  user-select: none;
}
svg {
  width: 24px;
  height: 24px;
  fill: none;
  color: var(---ink);
  path {
    fill: currentColor;
  }
}
</style>
