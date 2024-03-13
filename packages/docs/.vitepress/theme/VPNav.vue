<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  features: ('sidebar' | 'outline')[];
}>();

const features = computed(() => ({
  sidebar: props.features.includes('sidebar'),
  outline: props.features.includes('outline'),
}));

const emit = defineEmits<{
  sidebar: [_: string];
  outline: [_: void];
}>();
</script>
<template>
  <div class="VPNav (///)">
    <button v-if="features.sidebar" class="mat:air" @click="emit('sidebar','')">
      Sidebar
    </button>
    <button v-if="features.outline" class="mat:air" @click="emit('outline')">
      Outline
    </button>
  </div>
</template>

<style>
.VPNav {
  position: absolute;
  inset: 0;
  height: 50px;
  z-index: 1;
  display: flex;
  background-color: var(--mat-solid-0);
  box-shadow: inset 0 -1px 0 0 var(--mat-solid-15);
}

@media (min-width: 1000px) {
  .VPNav {
    display: none;
  }
}
</style>
