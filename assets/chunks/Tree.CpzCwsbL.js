const e=`import { InjectionKey, Ref } from 'vue';\r
import { TreeNode } from './misc';\r
\r
export const V_TREE_IN: InjectionKey<{\r
  model?: any;\r
  connected: boolean;\r
  tree: TreeNode[];\r
  load?: (value: any) => TreeNode[];\r
  nav(delta: 1 | -1): void;\r
  current: any;\r
}> = Symbol('VTree');\r
\r
export const computedSelectedStateForTreeNode = new WeakMap<\r
  TreeNode<any>,\r
  Ref<{\r
    unclear: boolean;\r
    selected: boolean;\r
    mixed: boolean;\r
  }>\r
>();\r
`;export{e as default};
