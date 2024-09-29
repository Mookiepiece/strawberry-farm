<script setup lang="ts">
import { computed } from 'vue';
import VModal from './VModal.vue';

const model = defineModel();
const props = withDefaults(
  defineProps<{
    width?: number;
    title?: string;
    strong?: boolean;
  }>(),
  { width: 800 },
);

const width = computed(() =>
  typeof props.width === 'number' ? props.width + 'px' : props.width,
);
</script>

<template>
  <VModal
    class="VDialog"
    :style="{ '--v-width': width }"
    v-model="model"
    :strong
  >
    <div class="VDialogHeader">
      {{ title }}
      <kbd class="ml-auto">Esc</kbd>
    </div>
    <slot />
  </VModal>
</template>
