<script setup lang="ts">
import { ref } from 'vue';

const model = defineModel();

defineProps<{
  disabled?: boolean;
}>();

const el = ref<HTMLDivElement>();

defineExpose({ el });
</script>

<template>
  <div
    :tabindex="disabled ? '-1' : '0'"
    class="VSwitch"
    :aria-disabled="disabled"
    :aria-pressed="model ? 'true' : 'false'"
  >
    <slot />
    <div class="VSwitchIndicator"></div>
  </div>
</template>
