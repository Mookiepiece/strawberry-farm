const r=`<script lang="ts" setup>\r
import { VPopover } from '@mookiepiece/strawberry-farm';\r
<\/script>\r
\r
<template>\r
  <div class="good">\r
    <VPopover trap>\r
      <button>Menu</button>\r
      <template #popper>\r
        <VPopover trigger="hover" trap>\r
          <button>Hover</button>\r
          <template #popper>\r
            <button>VIS</button>\r
          </template>\r
        </VPopover>\r
      </template>\r
    </VPopover>\r
\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  display: grid;\r
  gap: 10px;\r
}\r
</style>\r
`;export{r as default};
