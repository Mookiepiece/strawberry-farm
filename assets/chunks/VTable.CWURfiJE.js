const n=`<script lang="ts">\r
export type TableColumn<T = any> = {\r
  name: keyof T | \`remix\${string}\`;\r
  title?: string;\r
\r
  width?: number;\r
  minWidth?: number;\r
};\r
\r
type UnArray<T = any> =\r
  NonNullable<UnwrapRef<T>> extends Array<infer I>\r
    ? NonNullable<UnwrapRef<I>>\r
    : NonNullable<UnwrapRef<T>>;\r
\r
export type TableColumns<T = any> = TableColumn<UnArray<T>>[];\r
<\/script>\r
<script setup lang="ts" generic="T = any">\r
import { ref, UnwrapRef } from 'vue';\r
\r
const props = defineProps<{\r
  columns: TableColumn<T>[];\r
  data?: T[];\r
}>();\r
\r
const data = [\r
  [\r
    'a.m.',\r
    'Clean room',\r
    'Football training',\r
    'Dance Course',\r
    'History Class',\r
    'Buy drinks',\r
    'Study hour',\r
    'Free time',\r
  ],\r
  [\r
    'p.m.',\r
    'Yoga',\r
    'Chess Club',\r
    'Meet friends',\r
    'Gymnastics',\r
    'Birthday party',\r
    'Fishing trip',\r
    'Free time',\r
  ],\r
];\r
<\/script>\r
\r
<template>\r
  <div class="VTable"></div>\r
</template>\r
\r
<style>\r
.VTable {\r
}\r
</style>\r
`;export{n as default};
