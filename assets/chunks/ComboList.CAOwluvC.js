const r=`<script setup lang="ts">\r
import { useNav } from '@mookiepiece/strawberry-farm';\r
import { watch, computed, ref } from 'vue';\r
\r
const links = [\r
  {\r
    label: '再嘬一口入肺里，是我今生唯一的夙愿...《死一样的抽过》',\r
    value: 'https://www.bilibili.com/video/BV1tJ4m1T7QL',\r
  },\r
  {\r
    label: '或许，我早已经不属于这个地方《死一样的戒过》',\r
    value: 'https://www.bilibili.com/video/BV1W4421U7dU',\r
  },\r
  {\r
    label: '是我不听劝，迷失在花花世界...《失烟症》',\r
    value: 'https://www.bilibili.com/video/BV1Gb42177CL',\r
  },\r
];\r
\r
const { current, nav } = useNav(\r
  undefined,\r
  computed(() => links.map((_, i) => i)),\r
);\r
\r
const handleKeydown = (e: KeyboardEvent) => {\r
  switch (e.key) {\r
    case 'ArrowUp':\r
      e.preventDefault();\r
      nav(-1);\r
      break;\r
    case 'ArrowDown':\r
      e.preventDefault();\r
      nav(1);\r
      break;\r
    case 'Enter':\r
      e.preventDefault();\r
      box.value?.nextElementSibling\r
        ?.querySelector<HTMLAnchorElement>('a.current')\r
        ?.click();\r
  }\r
};\r
\r
const q = ref('');\r
const box = ref<HTMLInputElement>();\r
\r
watch(current, $current => {\r
  if ($current >= 0) {\r
    q.value = links[$current].label;\r
    box.value?.setSelectionRange(q.value.length, q.value.length);\r
  }\r
});\r
<\/script>\r
\r
<template>\r
  <input v-model="q" @keydown="handleKeydown" ref="box" />\r
  <div>\r
    <a\r
      v-for="({ label, value }, index) in links"\r
      :key="index"\r
      target="_blank"\r
      :href="value"\r
      :class="{ current: current === index }"\r
      >{{ label }}</a\r
    >\r
  </div>\r
</template>\r
\r
<style scoped>\r
input,\r
a {\r
  display: block;\r
  width: 100%;\r
}\r
a.current,\r
a:hover {\r
  background: var(--mat-air-1);\r
}\r
\r
a:active {\r
  background: var(--mat-air-2);\r
}\r
</style>\r
`;export{r as default};
