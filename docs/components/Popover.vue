<script lang="ts" setup>
import { VPopover } from '@mookiepiece/strawberry-farm';
</script>

<template>
  <div class="good">
    <VPopover animated>
      <template #default>
        <button>Ref</button>
      </template>
      <template #popper>
        <button>VIS</button>
      </template>
    </VPopover>

    <VPopover trigger="hover">
      <template #default>
        <button>Ref</button>
      </template>
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
