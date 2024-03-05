<script setup lang="ts">
import * as allIcons from '@mookiepiece/strawberry-farm/html/TDesignManifest';
</script>

<template>
  <div class="good">
    <div class="good-cell [A] [CC] mat:air p-6" v-for="(v, k) of allIcons">
      <svg viewBox="0 0 24 24" fill="none">
        <path :d="v" />
      </svg>
      <span class="f3 [--]">T{{ k.substring(7) }}</span>
    </div>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  grid: auto-flow 1fr / repeat(auto-fill, 150px);
}

.good-cell {
  border-radius: var(--4);
  cursor: pointer;
  user-select: none;
}
svg {
  width: 2em;
  height: 2em;
  fill: none;
  color: #225;
  path {
    fill: currentColor;
  }
}
</style>
