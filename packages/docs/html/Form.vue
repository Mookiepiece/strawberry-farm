<script setup lang="ts">
import VInput from '@mookiepiece/strawberry-farm/vue/VInput.vue';
import { ref } from 'vue';

const model = ref('');
</script>

<template>
  <div class="[A]" style="gap: 20px">
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      class="size-s"
    />
    <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      class="size-l"
    />

    <VInput
      v-model="model"
      textarea
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
    />
    <VInput v-model="model" textarea placeholder="東方神霊廟 〜 Ten Desires." />
    <VInput
      v-model="model"
      textarea
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
    />

    <VInput
      v-model="model"
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="airplay"
    >
      <template #prefix><i-feather i="x" /></template>
    </VInput>
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="airplay"
    >
      <template #prefix><i-feather i="x" /></template>
    </VInput>
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="airplay"
    >
      <template #prefix><i-feather i="x" /></template>
    </VInput>
    <div class="sf-group size-s">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.com</ins>
    </div>
    <div class="sf-group">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.com</ins>
    </div>
    <div class="sf-group size-l">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.com</ins>
    </div>
  </div>
</template>

<style scoped></style>
