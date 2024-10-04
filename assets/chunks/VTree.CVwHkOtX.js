const e=`<script setup lang="ts">\r
import { computed, provide, reactive, ref } from 'vue';\r
import { TreeNode, flatTree } from './misc';\r
import { V_TREE_IN } from './Tree';\r
import VTreeNode from './VTreeNode.vue';\r
\r
const model = defineModel<any>();\r
\r
const props = withDefaults(\r
  defineProps<{\r
    connected?: boolean;\r
    tree?: TreeNode[];\r
    load?: (value: any) => TreeNode[];\r
  }>(),\r
  {\r
    tree: () => [],\r
  },\r
);\r
\r
const slots = defineSlots<{\r
  default?(props: {\r
    model: TreeNode & {\r
      current: boolean;\r
      unclear: boolean;\r
      selected: boolean;\r
      mixed: boolean;\r
      loading: boolean;\r
      level: number;\r
    };\r
  }): any;\r
}>();\r
\r
const tree = computed(() => reactive(props.tree));\r
\r
const collect = <T,>(...nodes: TreeNode<T>[]): TreeNode<T>[] => {\r
  const collection: TreeNode<T>[] = [];\r
  flatTree(i => collection.push(i), ...nodes);\r
  return collection;\r
};\r
\r
const choices = computed(() => collect(...tree.value));\r
\r
const _current = ref(null);\r
const current = computed({\r
  get() {\r
    return choices.value.some(i => i.value === _current.value)\r
      ? _current.value\r
      : choices.value[0].value;\r
  },\r
  set(v) {\r
    _current.value = v;\r
  },\r
});\r
\r
const nav = (delta: 1 | -1) => {\r
  const i =\r
    choices.value[\r
      choices.value.findIndex(({ value }) => value === current.value) + delta\r
    ];\r
  if (!i) return;\r
  current.value = i.value;\r
};\r
\r
provide(\r
  V_TREE_IN,\r
  reactive({\r
    model: computed({\r
      get() {\r
        return model.value;\r
      },\r
      set(v) {\r
        model.value = v;\r
      },\r
    }),\r
    tree,\r
    connected: computed(() => props.connected),\r
    load: computed(() => props.load),\r
    current,\r
    nav,\r
  }),\r
);\r
\r
const el = ref<HTMLDivElement>();\r
const onFocus = () =>\r
  el.value\r
    ?.querySelector<HTMLElement>('[role="treeitem"][tabindex="0"]')\r
    ?.focus();\r
\r
defineExpose({ el });\r
<\/script>\r
\r
<template>\r
  <div ref="el" role="tree" class="VTree" tabindex="-1" @focus="onFocus">\r
    <VTreeNode\r
      v-for="(i, index) in tree"\r
      :key="i.value"\r
      v-model="tree[index]"\r
      v-slot="_"\r
    >\r
      <slot v-bind="_">\r
        {{ _.model.label ?? _.model.value }}\r
      </slot>\r
    </VTreeNode>\r
  </div>\r
</template>\r
`;export{e as default};
