<script setup lang="ts">
import * as allIcons from '@mookiepiece/strawberry-farm/html/TDesignManifest';
import {IFeatherElement} from '@mookiepiece/strawberry-farm/html/IFeatherElement';

IFeatherElement.install();

const z = Object.keys(IFeatherElement.names);

</script>

<template>
  <div class="good">
    <div class="good-cell [A] [CC] mat:air p-6" v-for="k in z">
     <i-feather style="font-size: 24px;" :i="k"></i-feather>
      <span class="f3 [--]">{{ k }}</span>
    </div>
  </div>

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
  width: 24px;
  height: 24px;
  fill: none;
  color: var(---ink);
  path {
    fill: currentColor;
  }
}
</style>
