const r=`<script setup lang="ts">\r
import { ref } from 'vue';\r
\r
const mats = [\r
  'mat:air',\r
  'mat:airy',\r
  'mat:air-crown',\r
  'mat:solid',\r
  'mat:solidity',\r
  'mat:solid-crown',\r
  'mat:ruby',\r
  'mat:dust',\r
  'mat:dusty',\r
];\r
\r
const actives = ref(\r
  Array(mats.length)\r
    .fill(0)\r
    .map(() => false),\r
);\r
<\/script>\r
\r
<template>\r
  <div class="good f2" style="">\r
    <div v-for="(cls, index) in mats" class="[A]">\r
      <button\r
        :class="[cls, actives[index] && 'active']"\r
        @click="actives[index] = !actives[index]"\r
      >\r
        {{ cls }}\r
      </button>\r
      <button\r
        class="[:-]"\r
        :class="[cls, !actives[index] && 'active']"\r
        @click="actives[index] = !actives[index]"\r
      >\r
        {{ cls }}\r
      </button>\r
\r
      <button\r
        class="[:-]"\r
        aria-disabled="true"\r
        style="pointer-events: none"\r
        :class="[cls, !actives[index] && 'active']"\r
        @click="actives[index] = !actives[index]"\r
      >\r
        {{ cls }}\r
      </button>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  display: grid;\r
  grid-template: 150px / repeat(auto-fill, 100px);\r
  gap: var(--3);\r
  justify-content: start;\r
\r
  > div {\r
    display: flex;\r
    > button {\r
      height: 50px;\r
    }\r
  }\r
}\r
\r
.tony {\r
  background: linear-gradient(\r
      70deg,\r
      var(---ink) 40px,\r
      var(---main) 41px,\r
      var(---main) 80px,\r
      var(---foam) 81px,\r
      var(---foam) 120px,\r
      transparent 121px\r
    ),\r
    linear-gradient(\r
      10deg,\r
      var(---ink) 30px,\r
      var(---main) 32px,\r
      var(---main) 50px,\r
      var(---foam) 52px,\r
      var(---foam) 70px,\r
      transparent 72px\r
    );\r
\r
  border-radius: var(--3);\r
  color: var(---ink);\r
  box-shadow: inset 0 0 0 var(--1);\r
\r
  padding: var(--2);\r
\r
  &::first-line {\r
    font-size: var(--f1);\r
  }\r
}\r
</style>\r
`;export{r as default};
