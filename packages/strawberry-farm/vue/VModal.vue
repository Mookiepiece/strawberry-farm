<script setup lang="ts">
const model = defineModel();

const { closeOnCurtain } = defineProps<{
  closeOnCurtain?: string;
}>();
</script>

<template>
  <Teleport to="body">
    <div v-show="model" class="Curtain" @click.self="model = false">
      <div class="Modal">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
