<script setup lang="ts">
import VModal from './VModal.vue';

const model = defineModel();
const props = defineProps<{
  title?: string;
  strong?: boolean;
}>();
</script>

<template>
  <VModal class="VDialog" v-model="model" :strong="strong">
    <div class="VDialogHeader">
      {{ title }}
      <kbd class="ml-auto">Esc</kbd>
    </div>
    <slot />
  </VModal>
</template>
