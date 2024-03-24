const t=`<script setup lang="ts">\r
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';\r
<\/script>\r
\r
<template>\r
  <div class="[A] [SS]" style="gap: 20px">\r
    <VButton class="mat:ruby size-s" aria-pressed="true">\r
      <template #icon>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="mat:ruby size-s" aria-pressed="true">Button</VButton>\r
    <VButton class="mat:ruby" aria-pressed="true">\r
      <template #icon>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="mat:ruby" aria-pressed="true">Button</VButton>\r
    <VButton class="mat:ruby" aria-pressed="true">\r
      <template #icon>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
    <VButton class="mat:ruby size-l" aria-pressed="true">Button</VButton>\r
\r
    <VButton class="mat:air-crown size-s" aria-pressed="true">Button</VButton>\r
    <VButton class="mat:air-crown" aria-pressed="true">Button</VButton>\r
    <VButton class="mat:air-crown size-l" aria-pressed="true">Button</VButton>\r
\r
    <VButton class="mat:air size-s">Button</VButton>\r
    <VButton class="mat:air">Button</VButton>\r
    <VButton class="mat:air size-l">Button</VButton>\r
\r
    <VButton class="mat:air size-s">\r
      <template #icon>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
    <VButton class="mat:air">\r
      <template #icon>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
    <VButton class="mat:air size-l">\r
      <template #icon>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
  </div>\r
</template>\r
\r
<style scoped></style>\r
`;export{t as default};
