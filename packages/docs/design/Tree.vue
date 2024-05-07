<script setup lang="ts">
import VTree from '@mookiepiece/strawberry-farm/vue/VTree.vue';
import { CommonTreeItem } from '@mookiepiece/strawberry-farm/vue/misc';
import { reactive, ref } from 'vue';

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
            value: 'Project-3A',
          },
          {
            value: 'Project-3B',
          },
          {
            value: 'Project-3C',
          },
        ],
      },
      {
        value: 'Project-4',
      },
      {
        value: 'Project-5',
        items: [
          {
            value: 'Project-5A',
          },
          {
            value: 'Project-5B',
          },
          {
            value: 'Project-5C',
          },
        ],
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

const single = ref([]);
const checkboxes = ref([]);
</script>

<template>
  {{ tree }}
  <div class="[A] gap-2">
    <VTree class="VTreeDemo" v-model="single" :tree="tree" />
    <VTree class="VTreeDemo" v-model="checkboxes" :tree="tree" v-slot="_">
      <div @click="_.expand(!_.open)">
        {{ _.value + '1' }}
      </div>
    </VTree>
  </div>
</template>

<style>
.VTreeDemo {
  [role='treeitem'][aria-expanded] > div:first-child:before {
    content: '>';
  }

  [role='treeitem'][aria-expanded='true'] > div:first-child:before {
    content: 'v';
  }
  [role='treeitem'] {
    padding-left: 10px;
  }

  [role='treeitem']:focus-visible {
    outline: 2px solid var(---main);
  }

  [role='treeitem'][aria-selected='true'] > div:first-child:after {
    content: '✓';
  }
}
</style>
