<script setup lang="ts">
import VSwitch from '@mookiepiece/strawberry-farm/vue/VSwitch.vue';
</script>

<template>
  <div class="[A] gap-2">
    <div>
      <VSwitch class="Flyme">Speaker</VSwitch>
    </div>
    <div>
      <VSwitch class="Flyme --Long p-2">Speaker</VSwitch>
    </div>
  </div>
</template>

<style>
.VSwitch.Flyme {
  .VSwitchIndicator {
    padding: 2px;
    height: calc(var(---size) / 1.8);

    &::before {
      width: calc(var(---size) / 1.8 - 8px);
      transform: translateX(2px) scale(0.7);
      aspect-ratio: 2;
    }
  }

  &[aria-pressed='true'] .VSwitchIndicator::before {
    transform: translateX(calc(var(---size) / 1.8 - 2px));
    aspect-ratio: 1;
  }
}

.VSwitch.Flyme.--Long {
  display: flex;
  transition: background 1s ease;

  &:active {
    background: var(--mat-solid-1);
    transition: none;
  }
}
</style>
