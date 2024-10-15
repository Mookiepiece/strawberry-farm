const t=`<script setup lang="ts">\r
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';\r
<\/script>\r
\r
<template>\r
  <div class="good">\r
    <VButton class="GhostButton size-small">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="GhostButton size-small">Button</VButton>\r
    <VButton class="GhostButton size-small">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
    <VButton class="GhostButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="GhostButton">Button</VButton>\r
    <VButton class="GhostButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
    <VButton class="GhostButton size-large">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="GhostButton size-large">Button</VButton>\r
    <VButton class="GhostButton size-large">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
    <VButton class="GhostButton" :disabled="true">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="GhostButton" :disabled="true">Button</VButton>\r
    <VButton class="GhostButton" :disabled="true">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
    <!--  -->\r
    <VButton class="GrayButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="GrayButton">Button</VButton>\r
    <VButton class="GrayButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
\r
    <VButton class="OutlinedButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="OutlinedButton">Button</VButton>\r
    <VButton class="OutlinedButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
\r
    <VButton class="SolidButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="SolidButton">Button</VButton>\r
    <VButton class="SolidButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
\r
    <VButton class="TonalButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VButton>\r
    <VButton class="TonalButton">Button</VButton>\r
    <VButton class="TonalButton">\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      Button\r
    </VButton>\r
\r
    <a href="#6" class="VButton GhostButton">\r
      <i-feather i="arrow-left" />\r
    </a>\r
    <a href="#6" class="VButton GhostButton">\r
      <div class="Trunk">Anchor</div>\r
    </a>\r
    <a href="#6" class="VButton GhostButton">\r
      <i-feather i="arrow-left" />\r
      <div class="Trunk">Anchor</div>\r
    </a>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  max-width: 400px;\r
  display: grid;\r
  grid: auto/1fr 1fr 1fr;\r
  place-items: start start;\r
  gap: 10px;\r
}\r
</style>\r
`;export{t as default};
