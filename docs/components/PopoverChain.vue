<script lang="ts" setup>
import { VPopover } from '@mookiepiece/strawberry-farm';
</script>

<template>
  <div class="good">
    <VPopover trigger="click" trap>
      <button>Menu</button>
      <template #popper>
        <div>
          <VPopover trigger="click" trap>
            <button>Click</button>
            <template #popper>
              <div>
                <VPopover trigger="hover" trap dir="right">
                  <button>Hover</button>
                  <template #popper>
                    <div>
                      <VPopover trigger="hover" trap dir="top">
                        <button>Video</button>
                        <template #popper>
                          <div class="🍒 p-6">
                            🍒
                          </div>
                        </template>
                      </VPopover>
                    </div>
                  </template>
                </VPopover>
              </div>
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
