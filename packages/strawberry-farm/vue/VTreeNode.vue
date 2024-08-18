<script setup lang="ts">
import { Ref, computed, inject, reactive, ref, watchEffect } from 'vue';
import { TreeNode, flatTree } from './misc';
import { V_TREE_IN, computedSelectedStateForTreeNode } from './Tree';
import { share } from '../shared';

const model = defineModel<TreeNode>({ required: true });

const props = withDefaults(defineProps<{ level?: number }>(), { level: 0 });

const slots = defineSlots<{
  default?(props: {
    model: TreeNode & {
      current: boolean;
      unclear: boolean;
      selected: boolean;
      mixed: boolean;
      loading: boolean;
      level: number;
    };
  }): any;
}>();

const tree = inject(V_TREE_IN);
if (!tree) throw new Error();

const el = ref<HTMLDivElement>();

const current = computed(() => tree.current === model.value.value);
watchEffect(() => {
  if (current.value) el.value?.focus();
});

const collect = <T,>(...nodes: TreeNode<T>[]): TreeNode<T>[] => {
  const collection: TreeNode<T>[] = [];
  flatTree(i => collection.push(i), ...nodes);
  return collection;
};

const computeNodeState = <T,>(
  node: TreeNode<T>,
): Ref<{
  unclear: boolean;
  selected: boolean;
  mixed: boolean;
}> => {
  if (!tree.connected || !node.children) {
    return computed(() => ({
      mixed: false,
      unclear: false,
      selected: Array.isArray(tree.model)
        ? tree.model.includes(node.value)
        : tree.model === node.value,
    }));
  }

  if (computedSelectedStateForTreeNode.get(node)) {
    return computedSelectedStateForTreeNode.get(node)!;
  }

  computedSelectedStateForTreeNode.set(
    node,
    computed(() => {
      let unclear = false;
      let mixed = false;
      let selected = false;

      if (Array.isArray(node.children)) {
        selected = node.children.some(_node => {
          const t = computeNodeState(_node);
          return t.value.selected;
        });
        mixed =
          selected &&
          node.children.some(_node => {
            const t = computeNodeState(_node);
            return !t.value.selected;
          });
      } else {
        unclear = true;
      }

      return {
        unclear,
        selected,
        mixed,
      };
    }),
  );
  return computedSelectedStateForTreeNode.get(node)!;
};

const state = computeNodeState(model.value);
const selected = computed(() => state.value.selected);
const mixed = computed(() => state.value.mixed);
const unclear = computed(() => state.value.unclear);

const toggle = () => {
  if (tree.connected) {
    if (unclear.value) return;
    if (!selected.value || mixed.value) {
      const nodes = collect(model.value);
      if (Array.isArray(tree.model)) {
        nodes
          .filter(node => !node.children)
          .forEach(({ value: $value }) => {
            tree.model.includes($value) ? void 0 : tree.model.push($value);
            console.log(tree.model);
          });
        tree.model = tree.model;
      }
    } else {
      const nodes = collect(model.value);
      if (Array.isArray(tree.model)) {
        nodes
          .filter(node => !node.children)
          .forEach(({ value: $value }) => {
            tree.model.includes($value)
              ? tree.model.splice(tree.model.indexOf($value), 1)
              : void 0;
          });
        tree.model = tree.model;
      }
    }
  } else {
    const $value = model.value.value;
    if (Array.isArray(tree.model)) {
      tree.model.includes($value)
        ? tree.model.splice(tree.model.indexOf($value), 1)
        : tree.model.push($value);
      tree.model = tree.model;
    } else tree.model = $value;
  }
};

const open = computed({
  get() {
    return !!model.value.open;
  },
  set(v) {
    model.value.open = v as boolean;
  },
});

const foldable = computed(
  () =>
    !!(Array.isArray(model.value.children)
      ? model.value.children.length
      : model.value.children),
);

const loading = ref(false);
const load = share(async () => {
  try {
    loading.value = true;
    const $item = model;
    $item.value.children = await tree.load?.($item.value);
  } finally {
    loading.value = false;
  }
});

const show = async () => {
  open.value = true;
  if (model.value.children === true) await load();
};

const fold = async ($open = !open.value) => {
  if ($open) show();
  else open.value = false;
};

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      tree.nav(1);
      break;
    case 'ArrowUp':
      tree.nav(-1);
      break;
    case 'ArrowLeft':
      open.value = false;
      break;
    case 'ArrowRight':
      show();
      break;
    case 'Enter':
    case ' ':
      toggle();
      break;
  }
};

const toBind = reactive({
  value: computed(() => model.value.value),
  label: computed(() => model.value.label),
  meta: computed(() => model.value.meta),
  disabled: computed(() => model.value.disabled),
  open: computed({
    get: () => model.value.open,
    set(v) {
      model.value.open = v;
      model.value = model.value;
    },
  }),
  children: computed(() => model.value.children),
  current,
  selected: computed({
    get: () => selected.value,
    set(v) {
      if (v !== selected.value) toggle();
    },
  }),
  mixed,
  unclear,
  loading,
  level: computed(() => props.level),
});
</script>

<template>
  <div
    ref="el"
    role="treeitem"
    :aria-expanded="foldable ? open : undefined"
    :aria-busy="loading"
    :aria-selected="selected"
    @keydown.self.exact="handleKeydown"
    :tabindex="current ? '0' : '-1'"
    :data-level="level"
  >
    <slot
      v-bind="{
        model: toBind,
        // ...model,
        // current,
        // unclear,
        // mixed,
        // selected,
        // foldable,
        // loading,
        // level,
        // fold,
        // toggle,
      }"
    />
    <div
      role="group"
      v-if="open && Array.isArray(model.children) && model.children.length"
    >
      <VTreeNode
        v-for="(i, index) in model.children"
        v-model="model.children[index]"
        :level="level + 1"
        :key="i.value"
        v-slot="_"
      >
        <slot v-bind="_" />
      </VTreeNode>
    </div>
  </div>
</template>
