const r=`<script setup lang="ts">\r
import VSwitch from '@mookiepiece/strawberry-farm/vue/VSwitch.vue';\r
<\/script>\r
\r
<template>\r
  <div class="[A] gap-2">\r
    <div>\r
      <VSwitch class="Flyme">Speaker</VSwitch>\r
    </div>\r
    <div>\r
      <VSwitch class="Flyme --Long p-2">Speaker</VSwitch>\r
    </div>\r
  </div>\r
</template>\r
\r
<style>\r
.VSwitch.Flyme {\r
  .VSwitchIndicator {\r
    padding: 2px;\r
    height: calc(var(---size) / 1.8);\r
\r
    &::before {\r
      width: calc(var(---size) / 1.8 - 8px);\r
      transform: translateX(2px) scale(0.7);\r
      aspect-ratio: 2;\r
    }\r
  }\r
\r
  &[aria-pressed='true'] .VSwitchIndicator::before {\r
    transform: translateX(calc(var(---size) / 1.8 - 2px));\r
    aspect-ratio: 1;\r
  }\r
}\r
\r
.VSwitch.Flyme.--Long {\r
  display: flex;\r
  transition: background 1s ease;\r
\r
  &:active {\r
    background: var(--mat-solid-1);\r
    transition: none;\r
  }\r
}\r
</style>\r
`;export{r as default};
