<script setup lang="ts">
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';
</script>

<template>
  <div class="[A] [SS]" style="gap: 20px">
    <VButton class="mat:ruby size-s" aria-pressed="true">
      <template #icon>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="mat:ruby size-s" aria-pressed="true">Button</VButton>
    <VButton class="mat:ruby" aria-pressed="true">
      <template #icon>
        <i-feather i="airplay" />
      </template>
    </VButton>
    <VButton class="mat:ruby" aria-pressed="true">Button</VButton>
    <VButton class="mat:ruby" aria-pressed="true">
      <template #icon>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>
    <VButton class="mat:ruby size-l" aria-pressed="true">Button</VButton>

    <VButton class="mat:air-crown size-s" aria-pressed="true">Button</VButton>
    <VButton class="mat:air-crown" aria-pressed="true">Button</VButton>
    <VButton class="mat:air-crown size-l" aria-pressed="true">Button</VButton>

    <VButton class="mat:air size-s">Button</VButton>
    <VButton class="mat:air">Button</VButton>
    <VButton class="mat:air size-l">Button</VButton>

    <VButton class="mat:air size-s">
      <template #icon>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>
    <VButton class="mat:air">
      <template #icon>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>
    <VButton class="mat:air size-l">
      <template #icon>
        <i-feather i="airplay" />
      </template>
      Button
    </VButton>
  </div>
</template>

<style scoped></style>
