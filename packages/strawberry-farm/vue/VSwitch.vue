<script setup lang="ts">
import { ref } from 'vue';

const model = defineModel();

defineProps<{
  disabled?: boolean;
}>();

const toggle = () => (model.value = !model.value);

const el = ref<HTMLDivElement>();
defineExpose({ el });
</script>

<template>
  <div
    :tabindex="disabled ? '-1' : '0'"
    class="VSwitch"
    :aria-disabled="disabled"
    :aria-pressed="model ? 'true' : 'false'"
    @click="toggle"
    @keydown.enter="toggle"
    @keydown.space="toggle"
  >
    <slot />
    <div class="VSwitchIndicator"></div>
  </div>
</template>
