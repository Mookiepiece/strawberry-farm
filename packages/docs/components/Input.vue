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
    >
      <template #prefix><i-feather i="compass" /></template>
    </VInput>
    <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires.">
      <template #prefix><i-feather i="compass" /></template>
    </VInput>
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
    >
      <template #prefix><i-feather i="compass" /></template>
    </VInput>

    <VInput
      v-model="model"
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
    >
      <template #suffix><i-feather i="compass" /></template>
    </VInput>
    <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires.">
      <template #suffix><i-feather i="compass" /></template>
    </VInput>
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
    >
      <template #suffix><i-feather i="compass" /></template>
    </VInput>

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
      clearable
    >
      <template #suffix><i-feather i="compass" /></template>
    </VInput>
    <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." clearable>
      <template #suffix><i-feather i="compass" /></template>
    </VInput>
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
      clearable
    >
      <template #suffix><i-feather i="compass" /></template>
    </VInput>

    <VInput
      v-model="model"
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="compass"
      suffix="compass"
      clearable
    >
      <template #prefix>$ =</template>
      <template #suffix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>
    </VInput>
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="compass"
      suffix="compass"
      clearable
    >
      <template #prefix>$ =</template>
      <template #suffix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>
    </VInput>
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="compass"
      suffix="compass"
      clearable
    >
      <template #prefix>$ =</template>
      <template #suffix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>
    </VInput>
    <VInput
      v-model="model"
      class="size-s"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="compass"
      suffix="compass"
      clearable
    >
      <template #prefix>$ =</template>
      <template #suffix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>
    </VInput>
    <VInput
      v-model="model"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="compass"
      suffix="compass"
      clearable
    >
      <template #prefix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>
      <template #suffix>$ =</template>
    </VInput>
    <VInput
      v-model="model"
      class="size-l"
      placeholder="東方神霊廟 〜 Ten Desires."
      prefix="compass"
      suffix="compass"
      clearable
    >
      <template #prefix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>
      <template #suffix>$ =</template>
    </VInput>
  </div>
</template>

<style scoped></style>
