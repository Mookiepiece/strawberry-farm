<script lang="ts" setup>
import { VPopover } from '@mookiepiece/strawberry-farm';
</script>

<template>
  <div class="good">
    <VPopover animated>
      <button>Animated</button>
      <template #popper>
        <button class="VActionSheet">VIS</button>
      </template>
    </VPopover>

    <VPopover trigger="hover">
      <button>Hover</button>
      <template #popper>
        <button class="VActionSheet">VIS</button>
      </template>
    </VPopover>

    <VPopover trap>
      <button>Trap</button>
      <template #popper>
        <button>VIS</button>
      </template>
    </VPopover>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  gap: 10px;
}
</style>
