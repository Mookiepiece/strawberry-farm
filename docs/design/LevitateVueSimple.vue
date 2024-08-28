<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { levitate } from '@mookiepiece/strawberry-farm/shared';

const open = ref(false);

const button = ref<HTMLElement>();
const popper = ref<HTMLDivElement>();

watchEffect(onCleanup => {
  const $ref = button.value;
  const $popper = popper.value;
  const $open = open.value;
  if ($ref && $popper && $open) {
    onCleanup(
      levitate.auto($ref, () => {
        levitate($ref, $popper, {
          offset: 100,
        });
      }),
    );
  }
});
</script>

<template>
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">
    <div style="width: 500%; height: 1000px">
      <button ref="button" @click="open = !open">Reference</button>
      <Teleport to="body">
        <div v-if="open" ref="popper" class="levitated (///)">
          <div>Content</div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
.levitated {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
