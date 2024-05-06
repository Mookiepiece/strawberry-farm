<script setup lang="ts">
import VTree from '@mookiepiece/strawberry-farm/vue/VTree.vue';
import { CommonTreeItem } from '@mookiepiece/strawberry-farm/vue/misc';
import { ref } from 'vue';

const tree: CommonTreeItem[] = [
  {
    value: 'Projects',
    items: [
      {
        value: 'Project-1',
      },
      
      {
        value: 'Project-2',
      },
      
      {
        value: 'Project-3',
        items: [
          {
            value:'Project-3A'
          },
          {
            value:'Project-3B'
          },
          {
            value:'Project-3C'
          }
        ]
      },
      {
        value: 'Project-4',
      },
      {
        value: 'Project-5',
        items: [
          {
            value:'Project-5A'
          },
          {
            value:'Project-5B'
          },
          {
            value:'Project-5C'
          }
        ]
      },
    ],
  },
  {
    value: 'Reports',
  },
  {
    value: 'Letters',
  },
];


const single =ref(null)

</script>

<template>
  <VTree v-model="single" :items="tree" />
</template>

<style></style>
