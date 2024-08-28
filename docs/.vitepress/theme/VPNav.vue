<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  features: ('sidebar' | 'outline')[];
}>();

const features = computed(() => ({
  sidebar: props.features.includes('sidebar'),
  outline: props.features.includes('outline'),
}));

const sidebar = defineModel<boolean>('sidebar');
const outline = defineModel<boolean>('outline');
</script>
<template>
  <div class="VPNav [B] [FS]">
    <button
      v-if="features.sidebar"
      class="mat:air px-5"
      :aria-pressed="sidebar"
      @click="sidebar = !sidebar"
    >
      Sidebar
    </button>
    <img src="/favicon.ico" />
    <button
      v-if="features.outline"
      class="mat:air px-5"
      :aria-pressed="outline"
      @click="outline = !outline"
    >
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
    width: 299px;
    > :not(img) {
      display: none;
    }
  }
}

.VPNav img {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  margin: auto;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
