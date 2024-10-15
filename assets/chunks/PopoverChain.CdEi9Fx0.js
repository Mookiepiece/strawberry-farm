const r=`<script lang="ts" setup>\r
import { VPopover } from '@mookiepiece/strawberry-farm';\r
<\/script>\r
\r
<template>\r
  <div class="good">\r
    <VPopover trigger="click" trap>\r
      <button>Menu</button>\r
      <template #popper>\r
        <div>\r
          <VPopover trigger="click" trap>\r
            <button>Click</button>\r
            <template #popper>\r
              <div>\r
                <VPopover trigger="hover" trap dir="right">\r
                  <button>Hover</button>\r
                  <template #popper>\r
                    <div>\r
                      <VPopover trigger="hover" trap dir="top">\r
                        <button>Video</button>\r
                        <template #popper>\r
                          <div class="🍒 p-6">\r
                            🍒\r
                          </div>\r
                        </template>\r
                      </VPopover>\r
                    </div>\r
                  </template>\r
                </VPopover>\r
              </div>\r
            </template>\r
          </VPopover>\r
        </div>\r
      </template>\r
    </VPopover>\r
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
