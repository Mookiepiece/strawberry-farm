<script setup lang="ts">
import { Ref, computed, inject, ref, watchEffect } from 'vue';
import { TreeNode } from './misc';
import { V_TREE_IN, computedSelectedStateForTreeNode } from './Tree';
import { share } from '../functions';

const model = defineModel<TreeNode>({
  required: true,
});

withDefaults(
  defineProps<{
    level?: number;
  }>(),
  {
    level: 0,
  },
);

const slots = defineSlots<{
  default?(
    props: TreeNode & {
      current: boolean;
      unclear: boolean;
      selected: boolean;
      mixed: boolean;
      loading: boolean;
      foldable: boolean;
      level: number;
      fold(open?: boolean): Promise<unknown>;
      toggle(): void;
    },
  ): any;
}>();

const tree = inject(V_TREE_IN);
if (!tree) throw new Error();

const el = ref<HTMLDivElement>();

const current = computed(() => tree.current === model.value.value);
watchEffect(() => {
  if (current.value) el.value?.focus();
});

const computeNodeState = <T,>(
  node: TreeNode<T>,
): Ref<{
  unclear: boolean;
  selected: boolean;
  mixed: boolean;
}> => {
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
        if (tree.connected) {
          selected = node.children.every(_node => {
            const t = computeNodeState(_node);
            return !t.value.unclear && !!t.value.mixed && t.value.selected;
          });
          mixed = node.children.some(_node => {
            const t = computeNodeState(_node);
            return !t.value.unclear && !!t.value.mixed && t.value.selected;
          });
        } else {
          selected = Array.isArray(tree.model)
            ? tree.model.includes(model.value.value)
            : tree.model === model.value.value;
        }
      } else if (node.children) {
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
  const $value = model.value.value;

  if (tree.connected) {
    if (unclear.value) return;
    
  }

  Array.isArray(tree.model)
    ? tree.model.includes($value)
      ? tree.model.splice(tree.model.indexOf($value), 1)
      : tree.model.push($value)
    : (tree.model = $value);
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
        ...model,
        current,
        unclear,
        mixed,
        selected,
        foldable,
        loading,
        level,
        fold,
        toggle,
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
