<script lang="ts" setup>
import { VPopover } from '@mookiepiece/strawberry-farm';
</script>

<template>
  <div class="good">
    <VPopover trigger="click" trap>
      <button>Menu</button>
      <template #popper>
        <div>
          <VPopover trigger="hover" trap>
            <button>Hover</button>
            <template #popper>
              <button>VIS</button>
            </template>
          </VPopover>
        </div>
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
