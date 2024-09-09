import { Fragment, isVNode, VNode } from 'vue';

/**
 *
 * @license MIT element-plus `findFirstLegitChild()`
 */
export function child(node: any): VNode | null {
  // prettier-ignore
  dev: { if (Array.isArray(node) && node.length > 1) console.warn('[strawberry-farm] `child()` received array of nodes, only first node is rendered') }

  const i = Array.isArray(node) ? node[0] : node;

  if (isVNode(i)) {
    if (i.type === Fragment) return child(i.children);
    return i;
  }

  return null;
}
