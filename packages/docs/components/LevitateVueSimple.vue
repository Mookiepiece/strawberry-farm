<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { Bag, levitate } from '@mookiepiece/strawberry-farm/functions';

const show = ref(false);

const button = ref<Element>();
const popper = ref<HTMLDivElement>();

const bag = Bag();
onUnmounted(bag);

watch(
  () => [popper.value, show.value] as const,
  ([el, show]) => {
    if (el) {
      bag(
        levitate.auto(button.value!, () => {
          levitate(button.value!, el, {
            offset: 100,
          });
        }),
      );
    } else {
      if (!show) {
        bag();
      }
    }
  },
);
</script>

<template>
  <div style="position: relative; height: 300px; width: 100%; overflow: auto">
    <div style="width: 500%; height: 1000px">
      <button
        ref="button"
        class="sf-button"
        @click="show = !show"
      >
        Nike
      </button>
      <Teleport to="body">
        <div v-if="show" ref="popper" class="levitated fixed (///)">
          <div>Content</div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<style></style>
