<script setup lang="ts">
const model = defineModel();

const { closeOnCurtainClick } = defineProps({
  closeOnCurtainClick: {
    default: true,
  },
});
</script>

<template>
  <Teleport to="body">
    <Transition name="scale">
      <div
        v-if="model"
        class="SFCurtain"
        @click.self="closeOnCurtainClick && (model = false)"
      >
        <div class="SFModal">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
