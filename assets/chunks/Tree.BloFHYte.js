const r=`<script setup lang="ts">\r
import VTree from '@mookiepiece/strawberry-farm/vue/VTree.vue';\r
import { TreeNode } from '@mookiepiece/strawberry-farm/vue/misc';\r
import { ref } from 'vue';\r
\r
const _tree = (): TreeNode[] => [\r
  {\r
    value: 'Projects',\r
    children: [\r
      { value: 'Project-1' },\r
      { value: 'Project-2' },\r
      {\r
        value: 'Project-3',\r
        children: [\r
          { value: 'Project-3A' },\r
          { value: 'Project-3B' },\r
          { value: 'Project-3C' },\r
        ],\r
      },\r
      { value: 'Project-4' },\r
      {\r
        value: 'Project-5',\r
        children: [\r
          { value: 'Project-5A' },\r
          { value: 'Project-5B' },\r
          { value: 'Project-5C' },\r
        ],\r
      },\r
    ],\r
  },\r
  { value: 'Reports' },\r
  { value: 'Letters' },\r
];\r
\r
const tree: TreeNode[] = _tree();\r
\r
const tree3: TreeNode[] = _tree();\r
\r
const tree4: TreeNode[] = _tree();\r
\r
const single = ref<any>(null);\r
const checkboxes = ref<any[]>([]);\r
const checkboxes3 = ref<any[]>([]);\r
\r
const checkboxes4 = ref<any[]>([]);\r
<\/script>\r
\r
<template>\r
  {{ tree }}\r
  <div class="[A] gap-2">\r
    <VTree class="VTreeDemo" v-model="single" :tree="tree" />\r
    <VTree\r
      class="VTreeDemo2"\r
      v-model="checkboxes"\r
      :tree="tree"\r
      v-slot="{ model: _ }"\r
    >\r
      <div class="VTreeDemo2A" :style="{ '--level': _.level }">\r
        <div class="VTreeDemo2B" @click="_.open = !_.open">\r
          <i-feather\r
            v-if="_.children"\r
            :i="_.open ? 'chevron-down' : 'chevron-right'"\r
          />\r
          <div v-else style="width: 1em; aspect-ratio: 1"></div>\r
          <div>\r
            {{ _.label ?? _.value }}\r
          </div>\r
        </div>\r
        <i-feather\r
          class="VTreeDemo2C"\r
          @click="_.selected = !_.selected"\r
          :i="_.selected ? 'check-circle' : 'circle'"\r
        />\r
      </div>\r
    </VTree>\r
    <VTree\r
      class="VTreeDemo3"\r
      v-model="checkboxes3"\r
      :tree="tree3"\r
      v-slot="{ model: _ }"\r
    >\r
      <div class="VTreeDemo3A" :style="{ '--level': _.level }">\r
        <i-feather\r
          class="VTreeDemo3B"\r
          @click="_.open = !_.open"\r
          v-if="_.children"\r
          :i="_.open ? 'chevron-down' : 'chevron-right'"\r
        />\r
        <div class="VTreeDemo3C" @click="_.selected = !_.selected">\r
          <div>\r
            {{ _.label ?? _.value }}\r
          </div>\r
          <i-feather :i="_.selected ? 'check-circle' : 'circle'" />\r
        </div>\r
      </div>\r
    </VTree>\r
    <VTree\r
      class="VTreeDemo3"\r
      v-model="checkboxes4"\r
      :tree="tree3"\r
      v-slot="{ model: _ }"\r
      connected\r
    >\r
      <div class="VTreeDemo3A" :style="{ '--level': _.level }">\r
        <i-feather\r
          class="VTreeDemo3B"\r
          @click="_.open = !_.open"\r
          v-if="_.children"\r
          :i="_.open ? 'chevron-down' : 'chevron-right'"\r
        />\r
        <div class="VTreeDemo3C" @click="_.selected = !_.selected">\r
          <div>\r
            {{ _.label ?? _.value }}\r
          </div>\r
          <i-feather\r
            :i="_.mixed ? 'square' : _.selected ? 'check-circle' : 'circle'"\r
          />\r
        </div>\r
      </div>\r
    </VTree>\r
  </div>\r
</template>\r
\r
<style>\r
.VTreeDemo {\r
  [role='treeitem'][aria-expanded] > div:first-child:before {\r
    content: '>';\r
  }\r
\r
  [role='treeitem'][aria-expanded='true'] > div:first-child:before {\r
    content: 'v';\r
  }\r
  [role='treeitem'] {\r
    padding-left: 10px;\r
  }\r
\r
  [role='treeitem']:focus-visible {\r
    outline: 2px solid var(---main);\r
  }\r
\r
  [role='treeitem'][aria-selected='true'] > div:first-child:after {\r
    content: '✓';\r
  }\r
}\r
\r
.VTreeDemo2 {\r
  .VTreeDemo2A {\r
    position: relative;\r
    display: grid;\r
    grid: auto / auto calc(1em + 10px);\r
  }\r
  .VTreeDemo2B {\r
    display: flex;\r
    grid-area: 1 / 1 / 2 / 3;\r
    padding-left: calc(10px * var(--level));\r
    padding-right: calc(1em + 10px);\r
\r
    &:hover {\r
      background-color: var(--mat-air-1);\r
    }\r
    &:active {\r
      background-color: var(--mat-air-2);\r
    }\r
  }\r
\r
  .VTreeDemo2C {\r
    position: absolute;\r
    grid-area: 1 / 2 / 2 / 3;\r
    inset: 0;\r
    padding-inline: 5px;\r
    &:hover {\r
      background-color: var(--mat-air-1);\r
    }\r
    &:active {\r
      background-color: var(--mat-air-2);\r
    }\r
  }\r
\r
  /* [role='treeitem'][aria-expanded] > div:first-child:before {\r
    content: '>';\r
  }\r
\r
  [role='treeitem'][aria-expanded='true'] > div:first-child:before {\r
    content: 'v';\r
  } */\r
  /* [role='treeitem'] {\r
  } */\r
\r
  [role='treeitem']:focus-visible {\r
    outline: 2px solid var(---main);\r
  }\r
  /* \r
  [role='treeitem'][aria-selected='true'] > div:first-child:after {\r
    content: '✓';\r
  } */\r
}\r
\r
.VTreeDemo3 {\r
  .VTreeDemo3A {\r
    position: relative;\r
    display: grid;\r
    grid: auto / calc(1.6em + 10px * var(--level)) auto;\r
  }\r
  .VTreeDemo3B {\r
    position: absolute;\r
    top: 0;\r
    bottom: 0;\r
    right: 0;\r
    width: 1.6em;\r
    aspect-ratio: 1;\r
    grid-area: 1 / 1 / 2 / 2;\r
    z-index: 1;\r
    &:hover {\r
      background-color: var(--mat-air-1);\r
    }\r
    &:active {\r
      background-color: var(--mat-air-2);\r
    }\r
  }\r
  .VTreeDemo3C {\r
    grid-area: 1 / 1 / 2 / 3;\r
    display: flex;\r
    justify-content: space-between;\r
    padding-left: calc(1.6em + 10px * var(--level));\r
\r
    &:hover {\r
      background-color: var(--mat-air-1);\r
    }\r
    &:active {\r
      background-color: var(--mat-air-2);\r
    }\r
  }\r
\r
  [role='treeitem']:focus-visible {\r
    outline: 2px solid var(---main);\r
  }\r
}\r
</style>\r
`;export{r as default};
