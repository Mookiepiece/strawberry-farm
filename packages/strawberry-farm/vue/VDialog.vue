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
      <VButton
        class="ml-auto"
        v-if="!strong"
        tabindex="-1"
        @click="model = false"
      >
        <template #prefix>
          <kbd>Esc</kbd>
        </template>
      </VButton>
    </div>
    <slot />
  </VModal>
</template>
