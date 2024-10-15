const e=`<script setup lang="ts">\r
import VInput from '@mookiepiece/strawberry-farm/vue/VInput.vue';\r
import { ref } from 'vue';\r
\r
const model = ref('');\r
<\/script>\r
\r
<template>\r
  <div class="[A] [SS]" style="gap: 20px">\r
    <VInput\r
      v-model="model"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      class="size-small"\r
    />\r
    <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." />\r
    <VInput\r
      v-model="model"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      class="size-large"\r
    />\r
\r
    <VInput\r
      v-model="model"\r
      textarea\r
      class="size-small"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
    />\r
    <VInput v-model="model" textarea placeholder="東方神霊廟 〜 Ten Desires." />\r
    <VInput\r
      v-model="model"\r
      textarea\r
      class="size-large"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
    />\r
\r
    <VInput\r
      v-model="model"\r
      class="size-small"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
    >\r
      <template #prefix><i-feather i="compass" /></template>\r
    </VInput>\r
    <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires.">\r
      <template #prefix><i-feather i="compass" /></template>\r
    </VInput>\r
    <VInput\r
      v-model="model"\r
      class="size-large"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
    >\r
      <template #prefix><i-feather i="compass" /></template>\r
    </VInput>\r
\r
    <VInput\r
      v-model="model"\r
      class="size-small"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
    >\r
      <template #suffix><i-feather i="compass" /></template>\r
    </VInput>\r
    <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires.">\r
      <template #suffix><i-feather i="compass" /></template>\r
    </VInput>\r
    <VInput\r
      v-model="model"\r
      class="size-large"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
    >\r
      <template #suffix><i-feather i="compass" /></template>\r
    </VInput>\r
\r
    <VInput\r
      v-model="model"\r
      class="size-small"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    />\r
    <VInput\r
      v-model="model"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    />\r
    <VInput\r
      v-model="model"\r
      class="size-large"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    />\r
\r
    <VInput\r
      v-model="model"\r
      class="size-small"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    >\r
      <template #suffix><i-feather i="compass" /></template>\r
    </VInput>\r
    <VInput v-model="model" placeholder="東方神霊廟 〜 Ten Desires." clearable>\r
      <template #suffix><i-feather i="compass" /></template>\r
    </VInput>\r
    <VInput\r
      v-model="model"\r
      class="size-large"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    >\r
      <template #suffix><i-feather i="compass" /></template>\r
    </VInput>\r
\r
    <VInput\r
      v-model="model"\r
      class="size-small"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    >\r
      <template #prefix>$ =</template>\r
      <template #suffix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>\r
    </VInput>\r
    <VInput\r
      v-model="model"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    >\r
      <template #prefix>$ =</template>\r
      <template #suffix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>\r
    </VInput>\r
    <VInput\r
      v-model="model"\r
      class="size-large"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    >\r
      <template #prefix>$ =</template>\r
      <template #suffix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>\r
    </VInput>\r
    <VInput\r
      v-model="model"\r
      class="size-small"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    >\r
      <template #prefix>$ =</template>\r
      <template #suffix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>\r
    </VInput>\r
    <VInput\r
      v-model="model"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    >\r
      <template #prefix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>\r
      <template #suffix>$ =</template>\r
    </VInput>\r
    <VInput\r
      v-model="model"\r
      class="size-large"\r
      placeholder="東方神霊廟 〜 Ten Desires."\r
      clearable\r
    >\r
      <template #prefix>sina=[2tan(a/2)]/[1+tan²(a/2)]</template>\r
      <template #suffix>$ =</template>\r
    </VInput>\r
  </div>\r
</template>\r
\r
<style scoped></style>\r
`;export{e as default};
