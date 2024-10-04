const n=`<script setup lang="ts" generic="T">\r
const model = defineModel<T[]>();\r
\r
defineSlots<{\r
  default(p: { row: T; index: number }): any;\r
}>();\r
\r
<\/script>\r
\r
<template>\r
  <div class="VFormList">\r
    <template v-for="(item, index) in model">\r
      <slot :row="item" :index="index">\r
        hello index #{{ index }}\r
      </slot>\r
    </template>\r
  </div>\r
</template>\r
`;export{n as default};
