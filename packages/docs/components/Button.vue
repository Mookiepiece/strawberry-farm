<script setup lang="ts">
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';
</script>

<template>
  <div class="[A] [SS]" style="gap: 20px">
    <VButton class="mat:ruby size-s" aria-pressed="true">
      <i-feather i="airplay" />
    </VButton>
    <VButton class="mat:ruby size-s" aria-pressed="true">Button</VButton>
    <VButton class="mat:ruby" aria-pressed="true">
      <i-feather i="airplay" />
    </VButton>
    <VButton class="mat:ruby" aria-pressed="true">Button</VButton>
    <VButton class="mat:ruby" aria-pressed="true">
      <i-feather i="airplay" />
      <span class="Content">Button</span>
    </VButton>
    <VButton class="mat:ruby size-l" aria-pressed="true">Button</VButton>

    <VButton class="mat:air-crown size-s" aria-pressed="true">Button</VButton>
    <VButton class="mat:air-crown" aria-pressed="true">Button</VButton>
    <VButton class="mat:air-crown size-l" aria-pressed="true">Button</VButton>

    <VButton class="mat:air size-s">Button</VButton>
    <VButton class="mat:air">Button</VButton>
    <VButton class="mat:air size-l">Button</VButton>

    <VButton class="mat:air size-s">
      <i-feather i="airplay" />
      <span class="Content">Button</span>
    </VButton>
    <VButton class="mat:air">
      <i-feather i="airplay" />
      <span class="Content">Button</span>
    </VButton>
    <VButton class="mat:air size-l">
      <i-feather i="airplay" />
      <span class="Content">Button</span>
    </VButton>
  </div>
</template>

<style scoped></style>
