<script setup lang="ts">
import VTree from '@mookiepiece/strawberry-farm/vue/VTree.vue';
import { CommonTreeItem } from '@mookiepiece/strawberry-farm/vue/misc';
import { ref } from 'vue';

const _tree = (): CommonTreeItem[] => [
  {
    value: 'Projects',
    children: [
      { value: 'Project-1' },
      { value: 'Project-2' },
      {
        value: 'Project-3',
        children: [
          { value: 'Project-3A' },
          { value: 'Project-3B' },
          { value: 'Project-3C' },
        ],
      },
      { value: 'Project-4' },
      {
        value: 'Project-5',
        children: [
          { value: 'Project-5A' },
          { value: 'Project-5B' },
          { value: 'Project-5C' },
        ],
      },
    ],
  },
  { value: 'Reports' },
  { value: 'Letters' },
];

const tree: CommonTreeItem[] = _tree();

const tree3: CommonTreeItem[] = _tree();

const tree4: CommonTreeItem[] = _tree();

const single = ref<any>(null);
const checkboxes = ref<any[]>([]);
const checkboxes3 = ref<any[]>([]);

const checkboxes4 = ref<any[]>([]);
</script>

<template>
  {{ tree }}
  <div class="[A] gap-2">
    <VTree class="VTreeDemo" v-model="single" :tree="tree" />
    <VTree class="VTreeDemo2" v-model="checkboxes" :tree="tree" v-slot="_">
      <div class="VTreeDemo2A" :style="{ '--level': _.level }">
        <div class="VTreeDemo2B" @click="_.fold(!_.open)">
          <i-feather
            v-if="_.foldable"
            :i="_.open ? 'chevron-down' : 'chevron-right'"
          />
          <div v-else style="width: 1em; aspect-ratio: 1"></div>
          <div>
            {{ _.label ?? _.value }}
          </div>
        </div>
        <i-feather
          class="VTreeDemo2C"
          @click="_.toggle()"
          :i="_.selected ? 'check-circle' : 'circle'"
        />
      </div>
    </VTree>
    <VTree class="VTreeDemo3" v-model="checkboxes3" :tree="tree3" v-slot="_">
      <div class="VTreeDemo3A" :style="{ '--level': _.level }">
        <i-feather
          class="VTreeDemo3B"
          @click="_.fold(!_.open)"
          v-if="_.foldable"
          :i="_.open ? 'chevron-down' : 'chevron-right'"
        />
        <div class="VTreeDemo3C" @click="_.toggle()">
          <div>
            {{ _.label ?? _.value }}
          </div>
          <i-feather :i="_.selected ? 'check-circle' : 'circle'" />
        </div>
      </div>
    </VTree>
    <VTree class="VTreeDemo3" v-model="checkboxes4" :tree="tree3" v-slot="_">
      <div class="VTreeDemo3A" :style="{ '--level': _.level }">
        <i-feather
          class="VTreeDemo3B"
          @click="_.fold(!_.open)"
          v-if="_.foldable"
          :i="_.open ? 'chevron-down' : 'chevron-right'"
        />
        <div class="VTreeDemo3C" @click="_.toggle()">
          <div>
            {{ _.label ?? _.value }}
          </div>
          <i-feather
            :i="
              Array.isArray(_.children)
                ? _.children.every(i => checkboxes4.includes(i.value))
                  ? 'check-circle'
                  : 'circle'
                : _.selected
                  ? 'check-circle'
                  : 'circle'
            "
          />
        </div>
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

.VTreeDemo2 {
  .VTreeDemo2A {
    position: relative;
    display: grid;
    grid: auto / auto calc(1em + 10px);
  }
  .VTreeDemo2B {
    display: flex;
    grid-area: 1 / 1 / 2 / 3;
    padding-left: calc(10px * var(--level));
    padding-right: calc(1em + 10px);

    &:hover {
      background-color: var(--mat-air-1);
    }
    &:active {
      background-color: var(--mat-air-2);
    }
  }

  .VTreeDemo2C {
    position: absolute;
    grid-area: 1 / 2 / 2 / 3;
    inset: 0;
    padding-inline: 5px;
    &:hover {
      background-color: var(--mat-air-1);
    }
    &:active {
      background-color: var(--mat-air-2);
    }
  }

  /* [role='treeitem'][aria-expanded] > div:first-child:before {
    content: '>';
  }

  [role='treeitem'][aria-expanded='true'] > div:first-child:before {
    content: 'v';
  } */
  /* [role='treeitem'] {
  } */

  [role='treeitem']:focus-visible {
    outline: 2px solid var(---main);
  }
  /* 
  [role='treeitem'][aria-selected='true'] > div:first-child:after {
    content: '✓';
  } */
}

.VTreeDemo3 {
  .VTreeDemo3A {
    position: relative;
    display: grid;
    grid: auto / calc(1.6em + 10px * var(--level)) auto;
  }
  .VTreeDemo3B {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 1.6em;
    aspect-ratio: 1;
    grid-area: 1 / 1 / 2 / 2;
    z-index: 1;
    &:hover {
      background-color: var(--mat-air-1);
    }
    &:active {
      background-color: var(--mat-air-2);
    }
  }
  .VTreeDemo3C {
    grid-area: 1 / 1 / 2 / 3;
    display: flex;
    justify-content: space-between;
    padding-left: calc(1.6em + 10px * var(--level));

    &:hover {
      background-color: var(--mat-air-1);
    }
    &:active {
      background-color: var(--mat-air-2);
    }
  }

  [role='treeitem']:focus-visible {
    outline: 2px solid var(---main);
  }
}
</style>
