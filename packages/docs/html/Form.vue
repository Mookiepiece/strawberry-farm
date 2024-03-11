<script setup lang="ts">
import VInput from '@mookiepiece/strawberry-farm/vue/VInput.vue';
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';
import { ref } from 'vue';

const model = ref('');
</script>

<template>
  <div class="[A] [SS]" style="gap: 20px">
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
      prefix="compass"
    />
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="compass"
    />
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="compass"
    />

    <VInput
      v-model="model"
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
      suffix="compass"
    />
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      suffix="compass"
    />
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
      suffix="compass"
    />

    <VInput
      v-model="model"
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
      clearable
    />
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      clearable
    />
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
      clearable
    />

    <VInput
      v-model="model"
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
      suffix="compass"
      clearable
    />
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      suffix="compass"
      clearable
    />
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
      suffix="compass"
      clearable
    />

    <VInput
      v-model="model"
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
      suffix="compass"
      clearable
    >
      <template #prepend>$ =</template>
      <template #append>= ￥</template>
    ></VInput>

    <div class="sf-group size-s">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.w3.org/?q=</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>#1</ins>
    </div>
    <div class="sf-group">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.w3.org/?q=</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>#1</ins>
    </div>
    <div class="sf-group size-l">
      <ins>https://</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.w3.org/?q=</ins>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>#1</ins>
    </div>

    <VButton class="mat:ruby size-s" aria-pressed="true">Button</VButton>
    <VButton class="mat:ruby" aria-pressed="true">Button</VButton>
    <VButton class="mat:ruby size-l" aria-pressed="true">Button</VButton>

    <VButton class="mat:air-crown size-s" aria-pressed="true">Button</VButton>
    <VButton class="mat:air-crown" aria-pressed="true">Button</VButton>
    <VButton class="mat:air-crown size-l" aria-pressed="true">Button</VButton>

    <div class="sf-group size-s">
      <ins>https://</ins>
      <VButton class="mat:ruby" aria-pressed="true">Button</VButton>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.w3.org/?q=</ins>
      <VButton class="mat:air-crown" aria-pressed="true">Button</VButton>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <VButton class="mat:airy" aria-pressed="true">Button</VButton>
      <ins>#1</ins>
    </div>

    <div class="sf-group">
      <ins>https://</ins>
      <VButton class="mat:ruby" aria-pressed="true">Button</VButton>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.w3.org/?q=</ins>
      <VButton class="mat:air-crown" aria-pressed="true">Button</VButton>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <VButton class="mat:airy" aria-pressed="true">Button</VButton>
      <ins>#1</ins>
    </div>

    <div class="sf-group size-l">
      <ins>https://</ins>
      <VButton class="mat:ruby" aria-pressed="true">Button</VButton>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <ins>.w3.org/?q=</ins>
      <VButton class="mat:air-crown" aria-pressed="true">Button</VButton>
      <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />
      <VButton class="mat:airy" aria-pressed="true">Button</VButton>
      <ins>#1</ins>
    </div>
  </div>
</template>

<style scoped></style>
