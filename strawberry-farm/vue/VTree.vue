<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue';
import { TreeNode, flatTree } from './misc';
import { V_TREE_IN } from './Tree';
import VTreeNode from './VTreeNode.vue';

const model = defineModel<any>();

const props = withDefaults(
  defineProps<{
    connected?: boolean;
    tree?: TreeNode[];
    load?: (value: any) => TreeNode[];
  }>(),
  {
    tree: () => [],
  },
);

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

const tree = computed(() => reactive(props.tree));

const collect = <T,>(...nodes: TreeNode<T>[]): TreeNode<T>[] => {
  const collection: TreeNode<T>[] = [];
  flatTree(i => collection.push(i), ...nodes);
  return collection;
};

const choices = computed(() => collect(...tree.value));

const _current = ref(null);
const current = computed({
  get() {
    return choices.value.some(i => i.value === _current.value)
      ? _current.value
      : choices.value[0].value;
  },
  set(v) {
    _current.value = v;
  },
});

const nav = (delta: 1 | -1) => {
  const i =
    choices.value[
      choices.value.findIndex(({ value }) => value === current.value) + delta
    ];
  if (!i) return;
  current.value = i.value;
};

provide(
  V_TREE_IN,
  reactive({
    model: computed({
      get() {
        return model.value;
      },
      set(v) {
        model.value = v;
      },
    }),
    tree,
    connected: computed(() => props.connected),
    load: computed(() => props.load),
    current,
    nav,
  }),
);

const el = ref<HTMLDivElement>();
const onFocus = () =>
  el.value
    ?.querySelector<HTMLElement>('[role="treeitem"][tabindex="0"]')
    ?.focus();

defineExpose({ el });
</script>

<template>
  <div ref="el" role="tree" class="VTree" tabindex="-1" @focus="onFocus">
    <VTreeNode
      v-for="(i, index) in tree"
      :key="i.value"
      v-model="tree[index]"
      v-slot="_"
    >
      <slot v-bind="_">
        {{ _.model.label ?? _.model.value }}
      </slot>
    </VTreeNode>
  </div>
</template>
