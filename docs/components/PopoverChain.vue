<script lang="ts" setup>
import { VPopover } from '@mookiepiece/strawberry-farm';
</script>

<template>
  <div class="good">
    <VPopover trap>
      <button>Menu</button>
      <template #popper>
        <VPopover trigger="hover" trap>
          <button>Hover</button>
          <template #popper>
            <button>VIS</button>
          </template>
        </VPopover>
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
