const r=`<script lang="ts">\r
import 'dayjs/locale/zh';\r
import 'dayjs/locale/ja';\r
<\/script>\r
\r
<script setup lang="ts">\r
import { VCalendar } from '@mookiepiece/strawberry-farm';\r
<\/script>\r
\r
<template>\r
  <VCalendar change-on-keydown change-on-wheel style="max-width: fit-content;" />\r
</template>\r
`;export{r as default};
