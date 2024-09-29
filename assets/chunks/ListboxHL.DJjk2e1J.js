const r=`<script setup lang="ts">\r
import { VListbox } from '@mookiepiece/strawberry-farm';\r
import { ref } from 'vue';\r
\r
const model = ref(['Grapes']);\r
\r
const options = [\r
  { value: 'Grapes', label: '🍇' },\r
  { value: 'Party Popper', label: '🎉' },\r
];\r
<\/script>\r
\r
<template>\r
  <VListbox v-model="model" :options class="Listbox🎉" />\r
</template>\r
\r
<style >\r
.Listbox🎉 {\r
  /* border: 1px solid var(--mat-air-15); */\r
\r
  &:focus-visible {\r
    outline: 0;\r
  }\r
\r
  [role='group'] > h6 {\r
    padding: 10px 10px 0;\r
  }\r
\r
  [role='option'] {\r
    padding: 10px;\r
\r
    &:is(.Listbox🎉:focus-visible *).current {\r
      outline: 2px solid var(--500);\r
      outline-offset: -2px;\r
    }\r
\r
    &:not([aria-disable='true']) {\r
      &:hover {\r
        background-color: var(--mat-air-1);\r
      }\r
      &:active {\r
        background-color: var(--mat-air-2);\r
      }\r
    }\r
\r
    &[aria-selected='true'] {\r
      background-color: var(--100);\r
\r
      &:hover {\r
        background-color: var(--200);\r
      }\r
      &:active {\r
        background-color: var(--300);\r
      }\r
    }\r
  }\r
}\r
</style>\r
`;export{r as default};
