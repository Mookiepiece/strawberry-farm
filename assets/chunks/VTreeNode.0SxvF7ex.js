const e=`<script setup lang="ts">\r
import { Ref, computed, inject, reactive, ref, watchEffect } from 'vue';\r
import { TreeNode, flatTree } from './misc';\r
import { V_TREE_IN, computedSelectedStateForTreeNode } from './Tree';\r
import { share } from '../shared';\r
\r
const model = defineModel<TreeNode>({ required: true });\r
\r
const props = withDefaults(defineProps<{ level?: number }>(), { level: 0 });\r
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
const tree = inject(V_TREE_IN);\r
if (!tree) throw new Error();\r
\r
const el = ref<HTMLDivElement>();\r
\r
const current = computed(() => tree.current === model.value.value);\r
watchEffect(() => {\r
  if (current.value) el.value?.focus();\r
});\r
\r
const collect = <T,>(...nodes: TreeNode<T>[]): TreeNode<T>[] => {\r
  const collection: TreeNode<T>[] = [];\r
  flatTree(i => collection.push(i), ...nodes);\r
  return collection;\r
};\r
\r
const computeNodeState = <T,>(\r
  node: TreeNode<T>,\r
): Ref<{\r
  unclear: boolean;\r
  selected: boolean;\r
  mixed: boolean;\r
}> => {\r
  if (!tree.connected || !node.children) {\r
    return computed(() => ({\r
      mixed: false,\r
      unclear: false,\r
      selected: Array.isArray(tree.model)\r
        ? tree.model.includes(node.value)\r
        : tree.model === node.value,\r
    }));\r
  }\r
\r
  if (computedSelectedStateForTreeNode.get(node)) {\r
    return computedSelectedStateForTreeNode.get(node)!;\r
  }\r
\r
  computedSelectedStateForTreeNode.set(\r
    node,\r
    computed(() => {\r
      let unclear = false;\r
      let mixed = false;\r
      let selected = false;\r
\r
      if (Array.isArray(node.children)) {\r
        selected = node.children.some(_node => {\r
          const t = computeNodeState(_node);\r
          return t.value.selected;\r
        });\r
        mixed =\r
          selected &&\r
          node.children.some(_node => {\r
            const t = computeNodeState(_node);\r
            return !t.value.selected;\r
          });\r
      } else {\r
        unclear = true;\r
      }\r
\r
      return {\r
        unclear,\r
        selected,\r
        mixed,\r
      };\r
    }),\r
  );\r
  return computedSelectedStateForTreeNode.get(node)!;\r
};\r
\r
const state = computeNodeState(model.value);\r
const selected = computed(() => state.value.selected);\r
const mixed = computed(() => state.value.mixed);\r
const unclear = computed(() => state.value.unclear);\r
\r
const toggle = () => {\r
  if (tree.connected) {\r
    if (unclear.value) return;\r
    if (!selected.value || mixed.value) {\r
      const nodes = collect(model.value);\r
      if (Array.isArray(tree.model)) {\r
        nodes\r
          .filter(node => !node.children)\r
          .forEach(({ value: $value }) => {\r
            tree.model.includes($value) ? void 0 : tree.model.push($value);\r
            console.log(tree.model);\r
          });\r
        tree.model = tree.model;\r
      }\r
    } else {\r
      const nodes = collect(model.value);\r
      if (Array.isArray(tree.model)) {\r
        nodes\r
          .filter(node => !node.children)\r
          .forEach(({ value: $value }) => {\r
            tree.model.includes($value)\r
              ? tree.model.splice(tree.model.indexOf($value), 1)\r
              : void 0;\r
          });\r
        tree.model = tree.model;\r
      }\r
    }\r
  } else {\r
    const $value = model.value.value;\r
    if (Array.isArray(tree.model)) {\r
      tree.model.includes($value)\r
        ? tree.model.splice(tree.model.indexOf($value), 1)\r
        : tree.model.push($value);\r
      tree.model = tree.model;\r
    } else tree.model = $value;\r
  }\r
};\r
\r
const open = computed({\r
  get() {\r
    return !!model.value.open;\r
  },\r
  set(v) {\r
    model.value.open = v as boolean;\r
  },\r
});\r
\r
const foldable = computed(\r
  () =>\r
    !!(Array.isArray(model.value.children)\r
      ? model.value.children.length\r
      : model.value.children),\r
);\r
\r
const loading = ref(false);\r
const load = share(async () => {\r
  try {\r
    loading.value = true;\r
    const $item = model;\r
    $item.value.children = await tree.load?.($item.value);\r
  } finally {\r
    loading.value = false;\r
  }\r
});\r
\r
const show = async () => {\r
  open.value = true;\r
  if (model.value.children === true) await load();\r
};\r
\r
const fold = async ($open = !open.value) => {\r
  if ($open) show();\r
  else open.value = false;\r
};\r
\r
const handleKeydown = (e: KeyboardEvent) => {\r
  switch (e.key) {\r
    case 'ArrowDown':\r
      tree.nav(1);\r
      break;\r
    case 'ArrowUp':\r
      tree.nav(-1);\r
      break;\r
    case 'ArrowLeft':\r
      open.value = false;\r
      break;\r
    case 'ArrowRight':\r
      show();\r
      break;\r
    case 'Enter':\r
    case ' ':\r
      toggle();\r
      break;\r
  }\r
};\r
\r
const toBind = reactive({\r
  value: computed(() => model.value.value),\r
  label: computed(() => model.value.label),\r
  meta: computed(() => model.value.meta),\r
  disabled: computed(() => model.value.disabled),\r
  open: computed({\r
    get: () => model.value.open,\r
    set(v) {\r
      model.value.open = v;\r
      model.value = model.value;\r
    },\r
  }),\r
  children: computed(() => model.value.children),\r
  current,\r
  selected: computed({\r
    get: () => selected.value,\r
    set(v) {\r
      if (v !== selected.value) toggle();\r
    },\r
  }),\r
  mixed,\r
  unclear,\r
  loading,\r
  level: computed(() => props.level),\r
});\r
<\/script>\r
\r
<template>\r
  <div\r
    ref="el"\r
    role="treeitem"\r
    :aria-expanded="foldable ? open : undefined"\r
    :aria-busy="loading"\r
    :aria-selected="selected"\r
    @keydown.self.exact="handleKeydown"\r
    :tabindex="current ? '0' : '-1'"\r
    :data-level="level"\r
  >\r
    <slot\r
      v-bind="{\r
        model: toBind,\r
        // ...model,\r
        // current,\r
        // unclear,\r
        // mixed,\r
        // selected,\r
        // foldable,\r
        // loading,\r
        // level,\r
        // fold,\r
        // toggle,\r
      }"\r
    />\r
    <div\r
      role="group"\r
      v-if="open && Array.isArray(model.children) && model.children.length"\r
    >\r
      <VTreeNode\r
        v-for="(i, index) in model.children"\r
        v-model="model.children[index]"\r
        :level="level + 1"\r
        :key="i.value"\r
        v-slot="_"\r
      >\r
        <slot v-bind="_" />\r
      </VTreeNode>\r
    </div>\r
  </div>\r
</template>\r
`;export{e as default};
