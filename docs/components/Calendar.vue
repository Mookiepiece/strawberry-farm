<script lang="ts">
import 'dayjs/locale/zh';
import 'dayjs/locale/ja';
</script>

<script setup lang="ts">
import { VCalendar } from '@mookiepiece/strawberry-farm';
</script>

<template>
  <VCalendar change-on-keydown change-on-wheel style="max-width: fit-content;" />
</template>
