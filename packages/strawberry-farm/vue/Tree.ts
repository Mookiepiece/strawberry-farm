import { InjectionKey, Ref, reactive } from 'vue';
import { TreeNode } from './misc';

export const V_TREE_IN: InjectionKey<{
  model?: any;
  connected: boolean;
  tree: TreeNode[];
  load?: (value: any) => TreeNode[];
  nav(delta: 1 | -1): void;
  current: any;
}> = Symbol('VTree');

const useConnectedTree = (_nodes: TreeNode[]) => {
  const nodes = reactive(_nodes);

  _nodes.forEach(() => {});
};

export const computedSelectedStateForTreeNode = new WeakMap<
  TreeNode<any>,
  Ref<{
    unclear: boolean;
    selected: boolean;
    mixed: boolean;
  }>
>();

const eachChild = (node, cb) => {};
