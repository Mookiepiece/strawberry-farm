const r=`<script setup lang="ts">\r
import { VSelect } from '@mookiepiece/strawberry-farm';\r
\r
const options = [\r
  {\r
    title: 'Colors',\r
    options: ['red', 'blue', 'green', 'yellow', 'purple'],\r
  },\r
  {\r
    title: 'Numbers',\r
    options: ['one', 'two', 'three', 'four', 'five'],\r
  },\r
];\r
<\/script>\r
\r
<template>\r
  <VSelect :options />\r
</template>\r
`;export{r as default};
