<script setup lang="ts">
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';
</script>

<template>
  <div class="good">
    <VButton class="TextButton size-s">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="TextButton size-s">Button</VButton>
    <VButton class="TextButton size-s">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>
    <VButton class="TextButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="TextButton">Button</VButton>
    <VButton class="TextButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>
    <VButton class="TextButton size-l">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="TextButton size-l">Button</VButton>
    <VButton class="TextButton size-l">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>
    <VButton class="TextButton" :disabled="true">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="TextButton" :disabled="true">Button</VButton>
    <VButton class="TextButton" :disabled="true">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>
    <!--  -->
    <VButton class="GrayButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="GrayButton">Button</VButton>
    <VButton class="GrayButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>

    <VButton class="OutlinedButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="OutlinedButton">Button</VButton>
    <VButton class="OutlinedButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>

    <VButton class="SolidButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="SolidButton">Button</VButton>
    <VButton class="SolidButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>

    <VButton class="TonalButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="TonalButton">Button</VButton>
    <VButton class="TonalButton">
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>

    <a href="#6" class="Button TextButton">
      <i-feather i="arrow-left" />
    </a>
    <a href="#6" class="Button TextButton">
      <div class="Trunk">Anchor</div>
    </a>
    <a href="#6" class="Button TextButton">
      <i-feather i="arrow-left" />
      <div class="Trunk">Anchor</div>
    </a>
  </div>
</template>

<style scoped>
.good {
  max-width: 400px;
  display: grid;
  grid: auto/1fr 1fr 1fr;
  place-items: start start;
  gap: 10px;
}
</style>
